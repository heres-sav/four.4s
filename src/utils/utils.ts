export const chooseOne = (length: number, prevind: number): number=> {
  const index = Math.floor(Math.random() * length)
  if(length == 1) return index
  else if(prevind == index && index == 0 && length > 1) return index + 1
  else if(prevind == index && index == length - 1) return index - 1
  return index
}