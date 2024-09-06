import { throttle } from './throttle'

import './style.css'

function shuffle (array) {
  return array
    .slice()
    .map(value => ({ value, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ value }) => value)
}

const parseStoredData = (data, parser, defaultValue) => data ? parser(data) : defaultValue

function loadPreviousData () {
  const storedPairs = localStorage.getItem('pairsHistory')
  const storedNames = localStorage.getItem('names')

  return {
    pairsHistory: parseStoredData(storedPairs, JSON.parse, []),
    names: parseStoredData(storedNames, data => data.split(','), [])
  }
}

function saveData (history, names) {
  localStorage.setItem('pairsHistory', JSON.stringify(history))
  localStorage.setItem('names', names.join(','))
}

function init () {
  const { pairsHistory, names } = loadPreviousData()

  updateNamesField(names)
  displayLatestPairs(pairsHistory)
}

function updateNamesField (names) {
  if (names.length > 0) {
    document.getElementById('names').value = names.join(', ')
  }
}

function displayLatestPairs (pairsHistory) {
  if (pairsHistory.length > 0) {
    displayPairs(pairsHistory[pairsHistory.length - 1])
  }
}

function isPairsRepeated (currentPairs, previousPairsHistory) {
  return previousPairsHistory.some(previousPairs =>
    previousPairs.some(pair =>
      currentPairs.some(currentPair =>
        (currentPair[0] === pair[0] && currentPair[1] === pair[1]) ||
        (currentPair[0] === pair[1] && currentPair[1] === pair[0])
      )
    )
  )
}

function displayPairs (pairs) {
  const pairsList = document.getElementById('pairs-list')
  pairsList.innerHTML = ''

  pairs.forEach(pair => {
    const listItem = document.createElement('li')
    listItem.textContent = pair[1] ? `${pair[0]} и ${pair[1]}` : `${pair[0]} без пары`
    pairsList.appendChild(listItem)
  })
}

function generatePairs () {
  const names = getNamesFromInput()

  if (names.length < 2) {
    alert('Введите как минимум два имени.')
    return
  }

  let currentPairs
  const maxAttempts = 10
  let attempts = 0
  const { pairsHistory } = loadPreviousData()

  do {
    currentPairs = createPairs(shuffle(names))
    attempts++
  } while (isPairsRepeated(currentPairs, pairsHistory) && attempts < maxAttempts)

  updateHistoryAndSave(pairsHistory, currentPairs, names)
}

function getNamesFromInput () {
  return document.getElementById('names').value
    .split(',')
    .map(name => name.trim())
    .filter(name => name !== '')
}

function createPairs (names) {
  const pairs = []
  for (let i = 0; i < names.length; i += 2) {
    pairs.push([names[i], names[i + 1] || null])
  }
  return pairs
}

function updateHistoryAndSave (pairsHistory, currentPairs, names) {
  pairsHistory.push(currentPairs)

  if (pairsHistory.length > 2) {
    pairsHistory.shift()
  }

  saveData(pairsHistory, names)
  displayPairs(currentPairs)
}

window.onload = () => {
  init()

  const button = document.getElementById('generate-button')
  button.addEventListener('click', throttle(generatePairs, 1000))
}
