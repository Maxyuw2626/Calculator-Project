/* =============================================
   Premium Calculator — Script
   Clean architecture, keyboard support,
   smooth interactions, edge-case handling
   ============================================= */

class Calculator {
  constructor() {
    this.previousOperand = ''
    this.currentOperand = '0'
    this.operation = undefined
    this.shouldResetScreen = false

    this.resultSpan = document.getElementById('result')
    this.expressionSpan = document.getElementById('expression')
    this.deleteBtn = document.querySelector('[data-action="delete"]')
    this.resultContainer = this.resultSpan.closest('.calculator__result')

    this.bindEvents()
  }

  /* ---------- Core Logic ---------- */

  clear() {
    this.previousOperand = ''
    this.currentOperand = '0'
    this.operation = undefined
    this.shouldResetScreen = false
  }

  delete() {
    if (this.shouldResetScreen) return
    if (this.currentOperand.length <= 1) {
      this.currentOperand = '0'
      return
    }
    this.currentOperand = this.currentOperand.slice(0, -1)
  }

  appendNumber(value) {
    if (this.shouldResetScreen) {
      this.currentOperand = ''
      this.shouldResetScreen = false
    }

    if (value === '.' && this.currentOperand.includes('.')) return
    if (value === '.' && this.currentOperand === '') {
      this.currentOperand = '0.'
      return
    }
    if (this.currentOperand === '0' && value !== '.') {
      this.currentOperand = value
      return
    }

    this.currentOperand += value
  }

  chooseOperation(op) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = op
    this.previousOperand = this.currentOperand
    this.shouldResetScreen = true
  }

  compute() {
    const prev = parseFloat(this.previousOperand)
    const curr = parseFloat(this.currentOperand)

    if (isNaN(prev) || isNaN(curr)) return

    let result

    switch (this.operation) {
      case 'add':
        result = prev + curr
        break
      case 'subtract':
        result = prev - curr
        break
      case 'multiply':
        result = prev * curr
        break
      case 'divide':
        if (curr === 0) {
          result = 'Error'
        } else {
          result = prev / curr
        }
        break
      default:
        return
    }

    if (result === 'Error') {
      this.currentOperand = 'Error'
      this.previousOperand = ''
      this.operation = undefined
      return
    }

    this.currentOperand = this.trimResult(result)
    this.previousOperand = ''
    this.operation = undefined
    this.shouldResetScreen = true
  }

  negate() {
    if (this.currentOperand === '0' || this.currentOperand === 'Error') return
    this.currentOperand = this.currentOperand.startsWith('-')
      ? this.currentOperand.slice(1)
      : '-' + this.currentOperand
  }

  percent() {
    const num = parseFloat(this.currentOperand)
    if (isNaN(num)) return
    this.currentOperand = this.trimResult(num / 100)
  }

  /* ---------- Helpers ---------- */

  trimResult(value) {
    if (!isFinite(value)) return 'Error'
    const str = String(value)
    if (str.length <= 14) return str
    return parseFloat(value.toPrecision(10)).toString()
  }

  formatNumber(value) {
    if (value === 'Error') return 'Error'

    const parts = value.split('.')
    let intPart = parts[0]
    const decimalPart = parts.length > 1 ? '.' + parts[1] : ''

    const isNegative = intPart.startsWith('-')
    if (isNegative) intPart = intPart.slice(1)

    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return (isNegative ? '-' : '') + formatted + decimalPart
  }

  /* ---------- Display ---------- */

  updateDisplay() {
    // Auto-resize font based on length
    const len = this.currentOperand.length
    let fontSize

    if (len <= 8) {
      fontSize = this.getBaseFontSize()
    } else if (len <= 11) {
      fontSize = this.getBaseFontSize() * 0.75
    } else if (len <= 14) {
      fontSize = this.getBaseFontSize() * 0.58
    } else {
      fontSize = this.getBaseFontSize() * 0.46
    }

    this.resultSpan.style.fontSize = fontSize + 'rem'
    this.resultSpan.textContent = this.formatNumber(this.currentOperand)

    const opSymbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' }
    if (this.operation && this.previousOperand) {
      this.expressionSpan.textContent =
        this.formatNumber(this.previousOperand) + ' ' + (opSymbols[this.operation] || '')
    } else {
      this.expressionSpan.textContent = ''
    }
  }

  getBaseFontSize() {
    const width = window.innerWidth
    if (width >= 768) return 4
    if (width >= 480) return 3.75
    return 3.25
  }

  triggerResultAnimation() {
    this.resultContainer.classList.remove('calculator__result--animate')
    void this.resultContainer.offsetWidth
    this.resultContainer.classList.add('calculator__result--animate')
  }

  triggerButtonPress(el) {
    el.classList.remove('btn--ripple')
    void el.offsetWidth
    el.classList.add('btn--ripple')
  }

  /* ---------- Event Handling ---------- */

  handleButtonClick(e) {
    const btn = e.currentTarget
    this.triggerButtonPress(btn)

    const action = btn.dataset.action
    const value = btn.dataset.value

    if (value !== undefined) {
      this.appendNumber(value)
    } else if (action === 'clear') {
      this.clear()
    } else if (action === 'delete') {
      this.delete()
    } else if (action === 'negate') {
      this.negate()
    } else if (action === 'percent') {
      this.percent()
    } else if (action === 'calculate') {
      if (this.operation && !this.shouldResetScreen) {
        this.compute()
        this.triggerResultAnimation()
      }
    } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
      this.chooseOperation(action)
    }

    this.updateDisplay()
  }

  handleKeyboard(e) {
    const { key, ctrlKey, metaKey } = e

    // Cmd/Ctrl + Z for undo is not supported — ignore
    if ((ctrlKey || metaKey) && key !== 'Backspace') return

    if (/^[0-9]$/.test(key)) {
      e.preventDefault()
      this.appendNumber(key)
      this.triggerButtonPress(this.getButtonByData('value', key))
    } else if (key === '.') {
      e.preventDefault()
      this.appendNumber(key)
      this.triggerButtonPress(this.getButtonByData('value', '.'))
    } else if (key === '+') {
      e.preventDefault()
      this.chooseOperation('add')
      this.triggerButtonPress(this.getButtonByData('action', 'add'))
    } else if (key === '-') {
      e.preventDefault()
      this.chooseOperation('subtract')
      this.triggerButtonPress(this.getButtonByData('action', 'subtract'))
    } else if (key === '*') {
      e.preventDefault()
      this.chooseOperation('multiply')
      this.triggerButtonPress(this.getButtonByData('action', 'multiply'))
    } else if (key === '/') {
      e.preventDefault()
      this.chooseOperation('divide')
      this.triggerButtonPress(this.getButtonByData('action', 'divide'))
    } else if (key === 'Enter' || key === '=') {
      e.preventDefault()
      if (this.operation && !this.shouldResetScreen) {
        this.compute()
        this.triggerResultAnimation()
      }
      this.triggerButtonPress(this.getButtonByData('action', 'calculate'))
    } else if (key === 'Backspace') {
      e.preventDefault()
      this.delete()
      this.triggerButtonPress(this.getButtonByData('action', 'delete'))
    } else if (key === 'Escape') {
      e.preventDefault()
      this.clear()
      this.triggerButtonPress(this.getButtonByData('action', 'clear'))
    } else if (key === '%') {
      e.preventDefault()
      this.percent()
      this.triggerButtonPress(this.getButtonByData('action', 'percent'))
    } else {
      return
    }

    this.updateDisplay()
  }

  getButtonByData(attr, value) {
    const btn = document.querySelector(`[data-${attr}="${value}"]`)
    return btn || document.createElement('button')
  }

  /* ---------- Setup ---------- */

  bindEvents() {
    const container = document.querySelector('.calculator__buttons')

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn')
      if (!btn) return
      this.handleButtonClick({ currentTarget: btn })
    })

    this.deleteBtn.addEventListener('click', (e) => {
      this.handleButtonClick({ currentTarget: e.currentTarget })
    })

    document.addEventListener('keydown', (e) => this.handleKeyboard(e))
    window.addEventListener('resize', () => this.updateDisplay())

    this.updateDisplay()
  }
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  new Calculator()
})
