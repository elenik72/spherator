import './style.css'

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function generatePairs () {
  const input = document.getElementById('names').value
  let names = input.split(',').map(name => name.trim()).filter(name => name !== '')
  if (names.length < 2) {

    alert('Введите как минимум два имени.')
    return
  }

  names = shuffle(names)
  const pairsList = document.getElementById('pairsList')
  pairsList.innerHTML = ''

  for (let i = 0; i < names.length; i += 2) {
    if (i + 1 < names.length) {
      const pair = document.createElement('li')
      pair.textContent = `${names[i]} и ${names[i + 1]}`
      pairsList.appendChild(pair)
    } else {
      const leftover = document.createElement('li')
      leftover.textContent = `${names[i]} без пары`
      pairsList.appendChild(leftover)
    }
  }
}

window.onload = () => {
  const button = document.getElementById('generate-button')
  button.addEventListener('click', generatePairs)
}
