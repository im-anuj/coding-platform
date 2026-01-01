export const users = [];
let USER_ID = 1;

export function incrementUserId(){
  return USER_ID++;
}

export function getUserId(){
  return USER_ID;
}