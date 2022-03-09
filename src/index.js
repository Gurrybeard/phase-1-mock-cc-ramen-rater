// write your code here
const url ='http://localhost:3000/ramens';
const ramenMenu = document.getElementById('ramen-menu');
// repeatable add menu item function used in both get and post
function addMenu(image,name,res,rate,comment){
        //display images
        let img = document.createElement('img');
        img.src = `${image}`
        ramenMenu.appendChild(img);
        // display info on click 
        img.addEventListener('click',()=>{
          document.querySelector('.detail-image').src = image;
             document.querySelector('.name').innerHTML = name;
             document.querySelector('.restaurant').innerHTML = res;
             document.querySelector('#rating-display').innerHTML = rate;
             document.querySelector('#comment-display').innerHTML = comment;
              
        })
}

document.addEventListener('DOMContentLoaded',()=>{
//get request
fetch(url)
.then(resp=>resp.json())
.then(data=>{
    data.forEach(element => {
    addMenu(element.image,element.name,element.restaurant,element.rating,element.comment)
    });

    console.log(data)
})
   
    //post form
    const form =document.getElementById('new-ramen');
    
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        console.log('form submited');
        //config
        const config ={
            method: 'POST',
            body: JSON.stringify({
                name:document.getElementById('new-name').value,
                restaurant:document.getElementById('new-restaurant').value,
                image:document.getElementById('new-image').value,
                rating:document.getElementById('new-rating').value,
                comment:document.getElementById('new-comment').value,
                
            }),
            headers: {
                'Content-Type': 'application/json'
        }}
        //post
        fetch(url,config)
        .then(resp => resp.json())
        .then(data=>{
            addMenu(data.image,data.name,data.restaurant,data.rating,data.comment)
        })

    })
    
    
    
})