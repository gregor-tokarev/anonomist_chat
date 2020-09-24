export default function(message) {
  !sessionStorage.getItem('messages') && sessionStorage.setItem('messages', '[]')
  const storage = JSON.parse(sessionStorage.getItem('messages'))
  typeof message === 'string' ? storage.push({ message }) : storage.push(message)
  sessionStorage.setItem('messages', JSON.stringify(storage))
}
