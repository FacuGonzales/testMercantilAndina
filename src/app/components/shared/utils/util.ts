export const alphaOrder = (a,b, decrec?:boolean) => {
  if(decrec){
    if(b < a) return -1;
    if(b > a) return 1;
    return 0;
  }
  
  if(a < b) return -1;
  if(a > b) return 1;
  return 0;
}