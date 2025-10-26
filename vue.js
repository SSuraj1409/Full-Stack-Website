const { createApp } = Vue;

createApp({
  data() {
    return {
      lessons: lessonData,
      cart: [],
      showCart: false,
      searchQuery: '',
      sortKey: '',
      sortOrder: 'asc',
      name: '',
      phone: '',
      checkoutMessage: '',
      showPopup: false
    };
  },
  computed: {
    filteredAndSorted() {
      let filtered = this.lessons.filter(lesson =>
        lesson.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.price.toString().includes(this.searchQuery) ||
        lesson.spaces.toString().includes(this.searchQuery)
      );
      if (this.sortKey) {
        filtered.sort((a, b) => {
          let result = typeof a[this.sortKey] === 'string'
            ? a[this.sortKey].localeCompare(b[this.sortKey])
            : a[this.sortKey] - b[this.sortKey];
          return this.sortOrder === 'asc' ? result : -result;
        });
      }
      return filtered;
    },
   
  }
}).mount('#app');
