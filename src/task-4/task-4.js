// import { remove, bind } from "lodash";

function renderCartItem(item) {
  return `
    <li data-item-id="${item.id}" data-item-qty="1" data-item-price="${item.price}" data-item-total="${item.price}">
        <h5 class="item-name">${item.name}</h5>
        <div class="item-info-wrapper">
            <div class="qty-wrapper">Qty: <span class="item-qty">1</span></div>
            <div class="price-wrapper"> Price: $<span class="item-price">${item.price}</span></div>
            <button class="btn btn-sm btn-outline-danger remove" data-item-id="${item.id}">Remove</button>
        </div>
    </li>
    `;
}

export default class ShoppingCart {
  constructor(rootEl) {
    this.cartEl = rootEl.querySelector('.shopping-cart-list');
    this.totalEl = rootEl.querySelector('.total');
    this.emptyCartEl = rootEl.querySelector('.empty-cart-message');
    this.removeAllEl = rootEl.querySelector('.remove-all');

    this.addEventListeners();
  }

  /**
     * Adds initial event listeners
     * @returns {undefined}
     */
  addEventListeners() {
    this.removeAllEl.addEventListener('click', this.removeAll.bind(this));

    this.cartEl.addEventListener('click', (e) => {
      const targetElId = e.target.parentElement.parentElement.dataset.itemId;
      this.removeItem(targetElId)
    });
  }

  /**
     * Adds new item to the cart
     * or increments its quantity if item is already present.
     * @param {Object} item - item description object
     * @returns {undefined}
     */
  addItem(item) {
    if (!this.isItemInCart(item.id)) {
      this.addNewItem(item);
    } else {
      this.incrementItem(item);
    }

    this.updateCartState();
  }

  /**
     * Renders new item in the cart
     * @param {Object} item - item description object
     * @returns {undefined}
     */
  addNewItem(item) {
    this.cartEl.innerHTML += renderCartItem(item);
  }

  /**
     * Increments quantity and total price for existing cart item
     * @param {Object} item - item description object
     * @returns {undefined}
     */
  incrementItem(item) {
    const allLi = this.cartEl.children;
    for (const li of allLi) {
      if (li.dataset.itemId) {
        li.dataset.itemQty++;
        li.dataset.itemTotal = li.dataset.itemPrice * li.dataset.itemQty;
        li.querySelector('.item-qty').textContent = li.dataset.itemQty;
        li.querySelector('.item-price').textContent = li.dataset.itemTotal;
      }
    }
  }

  /**
     * Checks existence of item in shopping cart by its id
     * @param {string} id - ID of an item
     * @returns {boolean} - true if item is present in shopping cart, false otherwise
     */
  isItemInCart(id) {
    let flag = false;
    for (const li of this.cartEl.children) {
      if (li.dataset.itemId === id) {
        flag = true;
      }
    }
    
    return flag;
  }

  /**
     * Checks if shopping cart is empty
     * @returns {boolean} true if there's no items in cart, false otherwise
     */
  isCartEmpty() {
    if (this.cartEl.children.length === 0) {
      return true;
    } else return false;
  }

  /**
     * Removes all items from the cart
     * @returns {undefined}
     */
  removeAll() {
    this.cartEl.innerHTML = ''
    
    this.updateCartState();
  }

  /**
     * Removes item from a list
     * @param {string} id - ID of and item to remove
     * @returns {undefined}
    */
  removeItem(id) {
    for (const li of this.cartEl.children) {
      if (li.dataset.itemId === id) {
        li.remove()
      }
    }
    this.updateCartState();
  }

  /**
     * Updates total sum and visibility of "no items" message / "remove all" button
     * @returns {undefined}
     */
  updateCartState() {
    this.updateTotal();
    this.updateNoItemsMessage();
    this.updateRemoveAllButton();
  }

  /**
     * Update total sum in cart
     * @returns {undefined}
     */
  updateTotal() {
    this.totalEl.textContent = this.getTotalSum();
  }

  /**
     * Get total sum of all items in list
     * @returns {number} Total sum
     */
  getTotalSum() {
    let totalSum = 0;
    for (const li of this.cartEl.children) {
      totalSum += Number(li.dataset.itemTotal);
    }

    return totalSum;
  }

  /**
     * Updates visibility of cart "no items" message depending on state of the cart
     * @returns {undefined}
     */
  updateNoItemsMessage() {
    if (this.isCartEmpty()) {
      this.emptyCartEl.classList.remove('d-none');
    } else {
      this.emptyCartEl.classList.add('d-none');
    }
  }

  /**
     * Updates visibility of cart /"remove all" button depending on state of the cart
     * @returns {undefined}
     */
  updateRemoveAllButton() {
    if (this.isCartEmpty()) {
      this.removeAllEl.classList.add('d-none');
    } else {
      this.removeAllEl.classList.remove('d-none')
    }
  }
}
