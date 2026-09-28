const states=[
{name:"Jammu & Kashmir",region:"North",x:39,y:13,e:"🏔️",d:"Wazwan, Rogan Josh, Yakhni",desc:"Kashmiri cuisine is known for aromatic spices, slow-cooked meats and the elaborate Wazwan tradition."},
{name:"Punjab",region:"North",x:44,y:25,e:"🫓",d:"Amritsari Kulcha, Sarson da Saag, Butter Chicken",desc:"Punjabi food is hearty and celebrated for tandoor cooking, breads, dairy and robust flavours."},
{name:"Rajasthan",region:"West",x:38,y:39,e:"🥘",d:"Dal Baati Churma, Laal Maas, Ghevar",desc:"Rajasthani cuisine developed around arid conditions, with inventive use of grains, pulses and preserved foods."},
{name:"Gujarat",region:"West",x:31,y:55,e:"🍘",d:"Dhokla, Khandvi, Undhiyu",desc:"Gujarati cuisine balances sweet, salty and spicy flavours, with a rich vegetarian food tradition."},
{name:"Maharashtra",region:"West",x:40,y:60,e:"🥪",d:"Vada Pav, Misal Pav, Puran Poli",desc:"From Mumbai street food to festive sweets, Maharashtra has a wide range of regional cooking styles."},
{name:"Goa",region:"West",x:42,y:73,e:"🐟",d:"Fish Curry, Xacuti, Bebinca",desc:"Goan food combines coastal ingredients with Portuguese and local culinary traditions."},
{name:"Madhya Pradesh",region:"Central",x:51,y:48,e:"🥟",d:"Poha, Bhutte ka Kees, Dal Bafla",desc:"Central Indian food includes grain-based breakfasts, street snacks and comforting dal preparations."},
{name:"Bihar",region:"East",x:63,y:43,e:"🍛",d:"Litti Chokha, Sattu Paratha, Thekua",desc:"Bihari cuisine features roasted wheat, gram flour, seasonal vegetables and distinctive festive sweets."},
{name:"West Bengal",region:"East",x:72,y:49,e:"🐟",d:"Shorshe Ilish, Mishti Doi, Rosogolla",desc:"Bengali cuisine is known for fish, mustard, rice and a celebrated tradition of sweets."},
{name:"Odisha",region:"East",x:67,y:61,e:"🍚",d:"Dalma, Pakhala Bhata, Chhena Poda",desc:"Odisha's food combines rice, lentils, vegetables and temple-food traditions."},
{name:"Assam",region:"Northeast",x:83,y:39,e:"🍃",d:"Masor Tenga, Khar, Pitha",desc:"Assamese cuisine often highlights rice, fish, herbs and distinctive fermented or alkaline preparations."},
{name:"Nagaland",region:"Northeast",x:91,y:45,e:"🌶️",d:"Smoked Pork, Axone, Bamboo Shoot",desc:"Naga cuisine is known for smoked meats, fermented ingredients and local chillies."},
{name:"Kerala",region:"South",x:48,y:88,e:"🥥",d:"Appam, Puttu, Sadya",desc:"Kerala cooking makes extensive use of coconut, rice, seafood and aromatic spices."},
{name:"Tamil Nadu",region:"South",x:58,y:86,e:"🥞",d:"Dosa, Idli, Chettinad",desc:"Tamil cuisine ranges from everyday tiffin to intensely spiced Chettinad dishes and festive meals."},
{name:"Karnataka",region:"South",x:50,y:77,e:"🍚",d:"Bisi Bele Bath, Mysore Pak, Neer Dosa",desc:"Karnataka offers diverse coastal, Malnad and Deccan traditions with rice, millet and lentils."},
{name:"Telangana",region:"South",x:59,y:70,e:"🍗",d:"Hyderabadi Biryani, Haleem, Mirchi ka Salan",desc:"Hyderabadi and Telangana food traditions feature rice dishes, meat preparations and bold spices."},
{name:"Andhra Pradesh",region:"South",x:64,y:77,e:"🌶️",d:"Gongura Pachadi, Pulihora, Andhra Meals",desc:"Andhra cooking is known for chilli-forward flavours, tangy gongura and elaborate rice-based meals."},
{name:"Uttar Pradesh",region:"North",x:57,y:32,e:"🍢",d:"Galouti Kebab, Awadhi Biryani, Petha",desc:"Awadhi and other UP traditions are rich in kebabs, biryanis, breads and sweets."}
];

const cards=document.getElementById("cards"), map=document.getElementById("indiaMap"), resultCount=document.getElementById("resultCount");
let region="All", query="", selected=null;

function renderMap(){
  map.innerHTML="";
  states.forEach((s,i)=>{
    const pin=document.createElement("button");
    pin.className="state-pin"+(selected===i?" selected":"");
    pin.style.left=s.x+"%"; pin.style.top=s.y+"%"; pin.textContent=s.e;
    pin.title=s.name; pin.onclick=()=>selectState(i);
    map.appendChild(pin);
    const lab=document.createElement("span"); lab.className="state-label";
    lab.style.left=s.x+"%"; lab.style.top=`calc(${s.y}% + 27px)`; lab.textContent=s.name;
    map.appendChild(lab);
  });
}
function filtered(){
  return states.map((s,i)=>({s,i})).filter(({s})=>{
    const text=(s.name+" "+s.region+" "+s.d).toLowerCase();
    return (region==="All"||s.region===region)&&(!query||text.includes(query));
  });
}
function renderCards(){
  const arr=filtered(); resultCount.textContent=arr.length+" regions";
  cards.innerHTML=arr.length?arr.map(({s,i})=>`
    <article class="card" onclick="selectState(${i})">
      <div class="card-icon">${s.e}</div><div>
        <h3>${s.name}</h3><p>${s.region} India</p>
        <div class="tags">${s.d.split(", ").slice(0,2).map(x=>`<span class="tag">${x}</span>`).join("")}</div>
      </div>
    </article>`).join(""):`<div class="empty">No cuisines found. Try another search.</div>`;
}
function selectState(i){
  selected=i; const s=states[i];
  document.getElementById("detailRegion").textContent=s.region.toUpperCase()+" INDIA";
  document.getElementById("detailState").textContent=s.name;
  document.getElementById("detailDescription").textContent=s.desc;
  document.getElementById("detailEmoji").textContent=s.e;
  document.getElementById("detailDishes").innerHTML=s.d.split(", ").map(x=>`<span>${x}</span>`).join("");
  renderMap();
  document.querySelector(".detail").scrollIntoView({behavior:"smooth",block:"nearest"});
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");region=b.dataset.region;renderCards()});
document.getElementById("search").oninput=e=>{query=e.target.value.toLowerCase().trim();renderCards()};
document.getElementById("reset").onclick=()=>{selected=null;region="All";query="";document.getElementById("search").value="";document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.region==="All"));renderMap();renderCards()};
document.getElementById("spotlightBtn").onclick=()=>selectState(states.findIndex(x=>x.name==="Bihar"));
renderMap();renderCards();selectState(states.findIndex(x=>x.name==="Bihar"));
