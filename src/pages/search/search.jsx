import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchHeader from './SearchHeader';
import Footer from '../../components/commons/Footer/Footer';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { RecentSearches } from './RecentSearches';
import { recentsearchAPI } from '../../apis/recentsearchAPI';
import BookTypePopup from './BookTypePopup';
// import { getFilteredResults } from '../../utils/search';
// import { mockBooks, mockRooms } from '../../apis/mockData';
import FilterPopup from './FilterPopup';
import { searchAPI } from '../../apis/searchAPI';
import {
  SearchWrapper,
  HeaderContainer,
  ContentContainer,
  FooterContainer,
  ListTypeContainer,
  ListTypeButton,
} from './search.styles';

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [searchType, setSearchType] = useState('책 제목');
  const [recentSearches, setRecentSearches] = useState([]);

  const [listType, setListType] = useState('책 목록');
  const [books, setBooks] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    category: null,
    deadline: {
      start: null,
      end: null,
    },
    period: {
      start: null,
      end: null,
    },
    recordcnt: null,
  });

  const [setTempFilters] = useState({ ...appliedFilters });

  useEffect(() => {
    setShowPopup(true);
  }, []);

  // 검색어 입력만
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // searchBar 돋보기 Button
  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // 빈 검색어는 무시

    try {
      await searchAPI.fetchSearchResults({
        searchQuery,
        searchType,
        filters: appliedFilters,
        setBooks,
        setRooms,
      });
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  // searchBar X button
  const handleClearSearch = () => {
    setSearchQuery('');
    setBooks([]);
    setRooms([]);
  };

  // searchType
  const handleTypeSelect = (typeId) => {
    const typeLabels = {
      book: '책 제목',
      author: '작가 이름',
      room: '방 이름',
    };
    setSearchType(typeLabels[typeId]);
    setShowPopup(false);
  };

  // search Filter 적용
  const handleFilterApply = async (newFilters) => {
    const updatedFilters = {
      ...newFilters,
      recordcnt: newFilters.recordcnt,
    };

    setAppliedFilters(updatedFilters);
    setShowFilterPopup(false);

    try {
      await searchAPI.fetchSearchResults({
        searchQuery,
        searchType,
        filters: updatedFilters,
        setBooks,
        setRooms,
      });
    } catch (error) {
      console.error('Filter apply failed:', error);
    }
  };

  // 최근 검색어 목록 조회
  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const data = await recentsearchAPI.getRecentSearches();
        setRecentSearches(
          data.recentSearchList.data.recentSearchList.map((item) => ({
            id: item.recentSearchId,
            text: item.recentSearch,
          }))
        );
      } catch (error) {
        console.error('최근 검색어 조회 실패:', error);
      }
    };

    fetchRecentSearches();
  }, []);

  const removeRecentSearch = async (index) => {
    // 특정한 최근 검색어 삭제
    try {
      const searchId = recentSearches[index].recentSearchId;
      await recentsearchAPI.removeRecentSearch(searchId);
      setRecentSearches(recentSearches.filter((_, i) => i !== index));
    } catch (error) {
      console.error('최근 검색어 삭제 실패:', error);
    }
  };
  const handleClearAll = async () => {
    // 최근 검색어 전체 삭제
    try {
      await recentsearchAPI.clearAllRecentSearches();
      setRecentSearches([]);
    } catch (error) {
      console.error('전체 검색어 삭제 실패:', error);
    }
  };

  return (
    <SearchWrapper>
      <HeaderContainer>
        <SearchHeader
          onBackClick={() => navigate(-1)}
          onSettingsClick={() => setShowFilterPopup(true)}
        />
      </HeaderContainer>

      <ContentContainer>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          searchType={searchType}
          onTypeClick={() => setShowPopup(true)}
          onSearch={handleSearch}
        />

        {!searchQuery && (
          <RecentSearches
            recentSearches={recentSearches.map((search) => search.text)}
            onClearAll={handleClearAll}
            onRemove={removeRecentSearch}
          />
        )}

        <ListTypeContainer $searchQuery={searchQuery}>
          <ListTypeButton
            onClick={() => setListType('책 목록')}
            $isSelected={listType === '책 목록'}
          >
            책 목록
          </ListTypeButton>
          <ListTypeButton
            onClick={() => setListType('같이읽기 목록')}
            $isSelected={listType === '같이읽기 목록'}
          >
            같이읽기 목록
          </ListTypeButton>
        </ListTypeContainer>

        <SearchResults
          $searchQuery={searchQuery}
          $searchType={searchType}
          filteredBooks={books}
          filteredRooms={rooms}
          listType={listType}
        />
      </ContentContainer>

      <FooterContainer>
        <Footer />
      </FooterContainer>

      {showFilterPopup && (
        <FilterPopup
          onClose={() => {
            setShowFilterPopup(false);
            setTempFilters({ ...appliedFilters }); // 팝업 닫을 때 임시 필터 초기화
          }}
          onApply={handleFilterApply}
          $currentFilters={appliedFilters}
        />
      )}

      {showPopup && (
        <BookTypePopup
          onSelect={handleTypeSelect}
          onClose={() => setShowPopup(false)}
          $currentType={searchType}
        />
      )}
    </SearchWrapper>
  );
}
