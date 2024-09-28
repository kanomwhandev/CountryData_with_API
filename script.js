const countries = document.querySelector(".countries");

const getCountry = function (country) {
  const req = new XMLHttpRequest();
  req.open("GET", `https://restcountries.com/v3.1/name/${country}?`);

  req.send();
  req.addEventListener("load", function () {
    /* กรณีที่ต้องการเเสดงเฉพาะ 1 ประเทศเท่านั้นเเละล้างข้อมูลเก่าเพื่อเเสดงข้อมูลใหม่
    const searchCountry = function () {
        const countryInput = document.getElementById("countryInput").value;
        countries.innerHTML = ''; // ล้างข้อมูลที่แสดงอยู่เดิม

        if (countryInput) {
            getCountry(countryInput);
        }
    }; */
    const formatPopulation = (population) => {
      if (population >= 1000000) {
        return `${Math.floor(population / 1000000)}M`;
      } else if (population >= 100000) {
        return `${Math.floor(population / 1000)}K`;
      } else if (population >= 10000) {
        return `${Math.floor(population / 1000)}K`;
      } else {
        return population;
      }
    };

    const [data] = JSON.parse(this.responseText);
    const lang = Object.entries(data.languages);
    const curr = Object.entries(data.currencies);
    const langHTML = lang
      .map(([key, value]) => `<span>${value}</span>`)
      .join(",");
    const currHTML = curr
      .map(
        ([key, value]) =>
          `<span>
          ${value.name} (${value.symbol})   
        </span>`
      )
      .join(", ");

    const html = `<article class="country">
            <img src="${data.flags.png}" class="country__img"/>
            <div class="country_data">
                <h3 class="country__name">🖤 ${data.name.official}</h3>
                <h3 class="country__name">✨ ${data.name.common} ✨</h3>
                <h4 class="country__region">${data.region}</h4>   
                <h4 class="country__region_sub">🗺️ ${data.subregion}</h4>
                <p class="country__row"><span>🤼</span>POP: ${
                  data.population
                }  ≈  (${formatPopulation(data.population)})</p>
                <p class="country__row"><span>🏙️</span>CAPITAL: ${
                  data.capital
                }</p>
                <p class="country__row"><span>📅</span>DAY: ${
                  data.startOfWeek
                }</p>
                <p class="country__row"><span>🤠</span>CONTINENTS: ${
                  data.continents
                }</p>
                <p class="country__row"><span>⚽</span>FIFA: ${data.fifa}</p>
                <p class="country__row"><span>⌛</span>LATLNG: ${
                  data.latlng
                }</p>
                <p class="country__row"><span>🛞</span>BORDERS: ${
                  data.borders
                }</p>
                <p class="country__row"><span>⭕</span>AREA: ${data.area}</p>
                <p class="country__row"><span>💰</span>TIME: ${
                  data.timezones
                }</p>          
                <p class="country__row"><span>🗣️</span>LANG: ${langHTML}</p>
                <p class="country__row"><span>💰</span>CUR: ${currHTML}</p>
                
                
              
            </div>
        </article>`;
    countries.insertAdjacentHTML("beforeend", html);
    countries.computedStyleMap.opacity;
  });
};
const form = document.getElementById("countryForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const countryInput = document.getElementById("countryInput").value;
  getCountry(countryInput);
});
getCountry("Thailand");
getCountry("usa");
getCountry("Africa");
getCountry("South Korea");
getCountry("Japan");
getCountry("Republic of India");

const clearButton = document.getElementById("submit");
clearButton.addEventListener("click", function () {
  localStorage.removeItem(getCountry); // ลบทุกความคิดเห็นออกจาก localStorage
});
