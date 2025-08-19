// Cart Store for Alpine.js
export const cartStore = {
  items: [],
  isOpen: false,
  isPulsing: false,

  init() {
    // Load cart from sessionStorage on init (better for shopping carts)
    const savedCart = sessionStorage.getItem('dunhayat-cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  },

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    this.saveCart();
    this.showNotification('محصول به سبد خرید اضافه شد');
    this.triggerPulse();
    this.refreshProductStates();
  },

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.refreshProductStates();
  },

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.refreshProductStates();
      }
    }
  },

  clearCart() {
    this.items = [];
    this.saveCart();
  },

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  isInCart(productId) {
    return this.items.some(item => item.id === productId);
  },

  getItemQuantity(productId) {
    const item = this.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  },

  saveCart() {
    sessionStorage.setItem('dunhayat-cart', JSON.stringify(this.items));
  },

  toggleCart() {
    this.isOpen = !this.isOpen;
  },

  closeCart() {
    this.isOpen = false;
  },

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-brand-brown text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
    notification.textContent = message;
    
    // Add a unique ID for safe removal
    const notificationId = `cart-notification-${Date.now()}`;
    notification.id = notificationId;
    
    // Safe append to body
    try {
      if (document.body) {
        document.body.appendChild(notification);
      } else {
        return;
      }
    } catch (error) {
      return;
    }
    
    // Animate in
    setTimeout(() => {
      try {
        const currentNotification = document.getElementById(notificationId);
        if (currentNotification) {
          currentNotification.classList.remove('translate-x-full');
        }
      } catch (error) {
        // Silent fail
      }
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      try {
        const currentNotification = document.getElementById(notificationId);
        if (currentNotification) {
          currentNotification.classList.add('translate-x-full');
          
          // Remove after animation
          setTimeout(() => {
            try {
              const finalNotification = document.getElementById(notificationId);
              if (finalNotification && finalNotification.parentNode) {
                finalNotification.parentNode.removeChild(finalNotification);
              }
            } catch (error) {
              // Last resort: force remove if still exists
              try {
                const forceRemove = document.getElementById(notificationId);
                if (forceRemove) {
                  forceRemove.remove();
                }
              } catch (forceError) {
                // Silent fail
              }
            }
          }, 300);
        }
      } catch (error) {
        // Silent fail
      }
    }, 3000);
  },

  formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  },

  triggerPulse() {
    this.isPulsing = true;
    setTimeout(() => {
      this.isPulsing = false;
    }, 1000);
  },

  // Method to refresh product states across components
  refreshProductStates() {
    // Dispatch a custom event that components can listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-updated', {
        detail: { items: this.items }
      }));
    }
  }
};
