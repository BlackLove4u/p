// src/utils/storage.js
const KEY = "phoenix_user_v1";

export function saveProfile(profile){
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch(e){}
}

export function loadProfile(){
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e){
    return null;
  }
}
