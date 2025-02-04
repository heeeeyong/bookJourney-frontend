import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // vite.config.js 프록시 설정
  headers: {
    'Content-Type': 'application/json',
    // user2의 access token
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczODU2NTY1NiwiZXhwIjoxNzM4NTY5MjU2fQ.pyMKKXyfDYh7LK0R2DlojNe725G3ksmFODEaoMVvpC8',
  },
});

export const searchAPI = {
  fetchSearchResults: async ({
    searchQuery,
    searchType,
    filters,
    setBooks,
    setRooms,
  }) => {
    try {
      // API 요청 URL 구성
      const paramsBook = new URLSearchParams({
        searchTerm: searchQuery,
        searchType: searchType,
        page: '1',
      });

      const paramsRoom = new URLSearchParams({
        searchTerm: searchQuery,
        searchType: searchType,
        page: '0',
      });

      // 카테고리 필터 추가
      if (filters.category) {
        paramsBook.append('genre', filters.category);
        paramsRoom.append('genre', filters.category);
      }
      // deadline 필터 추가
      if (filters.deadline?.start) {
        paramsRoom.append('recruitStartDate', filters.deadline.start);
      }
      if (filters.deadline?.end) {
        paramsRoom.append('recruitEndDate', filters.deadline.end);
      }

      // period 필터 추가
      if (filters.period?.start) {
        paramsRoom.append('roomStartDate', filters.period.start);
      }
      if (filters.period?.end) {
        paramsRoom.append('roomEndDate', filters.period.end);
      }
      // recordcnt 필터 추가
      if (filters.recordcnt) {
        paramsRoom.append('recordCount', filters.recordcnt);
      }

      const responseBook = await api.get(
        `/books/search?${paramsBook.toString()}`
      );
      const responseRoom = await api.get(
        `/rooms/search?${paramsRoom.toString()}`
      );

      if (responseBook.data.code === 200 && responseBook.data.data.bookList) {
        const mappedBooks = responseBook.data.data.bookList.map((book) => ({
          id: book.isbn, // ISBN을 id로 사용
          title: book.bookTitle.replace(/&lt;/g, '<').replace(/&gt;/g, '>'), // HTML 엔티티 디코딩
          author: book.authorName,
          coverImage: book.imageUrl,
        }));
        setBooks(mappedBooks);
      } else {
        setBooks([]);
      }

      if (responseRoom.data.code === 200 && responseRoom.data.data.roomList) {
        const mappedRooms = responseRoom.data.data.roomList.map((room) => ({
          id: room.roomId,
          book: room.bookTitle, // 책 제목
          author: room.authorName, // 작가 이름
          coverImage: room.imageUrl, // 이미지 URL
          title: room.roomName, // 방 이름
          currentpeople: room.memberCount, // 현재 인원
          totalpeople: room.recruitCount, // 총 모집 인원
          progress: room.roomPercentage, // 진행률
          startdate: room.progressStartDate, // 시작일
          enddate: room.progressEndDate, // 종료일
          isLocked: !room.public, // public이 false면 잠김
        }));
        setRooms(mappedRooms);
        console.log('room success!');
      } else {
        setRooms([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setBooks([]);
      setRooms([]);
      throw error;
    }
  },
};
