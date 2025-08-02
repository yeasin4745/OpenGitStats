let image=document.getElementById('image')
let error=document.getElementById('error')
let name=document.getElementById('name')
let bio=document.getElementById('bio')
let list=document.getElementById('list');

let details =document.getElementById('details')



async function loadData(username){
 try {
  let data=await fetch(`https://api.github.com/users/${username}`)
 if(!data.ok){
 throw new Error('Network error')
 } 
  let response =await data.json()
 return response;
 } catch (e) {
  error.innerHTML=e?.message;
 }
}



document.getElementById('button').onclick=async() =>{
 let username =document.querySelector('#username').value

  error.style.display='block'

let response = await loadData(username);


  image.style.display='block'
  details.style.display='block'
  error.style.display='none'

 image.src=response?.avatar_url;
 name.innerHTML=response?.name;
 bio.innerHTML=response?.bio;
 
 list.querySelector('#id').innerHTML=`Id :${response?.id}`
 list.querySelector('#location').innerHTML=`location :${response?.location}`;
 list.querySelector('#followers').innerHTML='Followers :' + response?.followers;
 list.querySelector('#following').innerHTML=`Following :${response?.following}`
 list.querySelector('#repo').innerHTML=`Public repository ${response?.public_repos}`
 list.querySelector('#create').innerHTML=`Profile created ${response?.created_at.slice(0,10)}`


} 






