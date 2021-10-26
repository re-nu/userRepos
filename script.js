

document.body.innerHTML=`
<input class='userName' type='text' placeholder='enter user-name' value='' >
<button class='srch' onclick='getRpo()'>Search</button>
<button class='bk' onclick='ref()'>Back</button>
<section class='container'>
  <div class='img'>
  </div>
  <div class='details'>
  </div>
</section>
`;
    
async function getRpo() {
  document.querySelector('.userName').style.display="none";
  document.querySelector('.srch').style.display="none";

  // user iuput value
      var un=document.querySelector('.userName').value;
      var get=un+"/repos";
      console.log(get);

    //get the repos of enter user
     const rps= await fetch("https://api.github.com/users/"+get);
     const rpsAr= await rps.json();                           //convert json data into array
     
     console.log(rpsAr)
     
      if(rpsAr.message==='Not Found'){                        // if invalid user then msg is
      window.alert('user not found');                         // not found ,so i used this if
      return                                                  // for user not found
    }
  
  var img=rpsAr[0].owner.avatar_url;                           //get image of user
  var un=rpsAr[0].owner.login;                                 // get user name

  document.querySelector(".img").innerHTML+=`                  
   <img src="${img}">                                         
    <b>${un}</b>
   `;                                                        //add image and name inside img div

  rpsAr.forEach(user => {
    
    const frk=user.forks_count;                             //get forks,stars,name,repo link of
    const str=user.stargazers_count;                        // all the repos of user
    const nm=user.name;
    const rpUrl=user.html_url;
    console.log(nm,frk,str);
  
   document.querySelector(".details").innerHTML+=`
   <div >
   <p><b>Repo Name:</b>${nm}</p>
   <b>Repo link:</b><a href="${rpUrl}">${nm}</a>
   <p><b>Star:</b>${str}</p>
   <p><b>Forks:</b>${frk}</p>
   </div>
   `;
   
  });                                                        //add  data of udser to .details div

  
}

function ref() {
  location.reload();
}
 
