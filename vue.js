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

        cartCount() {
            return this.cart.length;
        },
        totalPrice() {
            return this.cart.reduce((sum, item) => sum + item.price, 0);
        },
        canCheckout() {
            return /^[A-Za-z\s]+$/.test(this.name) && /^[0-9]+$/.test(this.phone) && this.cart.length > 0;
        }
    },
    methods: {
        addToCart(lesson) {
            if (lesson.spaces > 0) {
                lesson.spaces--;
                this.cart.push({ ...lesson, cartId: Date.now() + Math.random() });
            }
        },
        removeFromCart(item) {
            this.cart = this.cart.filter(l => l.cartId !== item.cartId);
            const foundLesson = this.lessons.find(l => l.id === item.id);
            if (foundLesson) foundLesson.spaces++;
        },
        toggleView() {
            this.showCart = !this.showCart;
        },
        checkout() {
            this.checkoutMessage = `Hi ${this.name}, your order totaling £${this.totalPrice.toFixed(2)} has been submitted!`;
            this.cart = [];
            this.name = '';
            this.phone = '';
            this.showPopup = true;
        },
        closePopup() {
            this.showPopup = false;
        }

    }
}).mount('#app');
