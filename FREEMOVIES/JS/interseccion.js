function Interseccion(){
    const options = {
        root:null,
        rootMargin:'0px',
        threshold: 0.25
    };
    
    const img = document.querySelectorAll('img');
    console.log(img)
    
    function callback(entries, observer){
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.src= entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    
    }
    
    const observer = new IntersectionObserver(callback, options);
    
    
    img.forEach(i => {
        observer.observe(i)  
    })

}










