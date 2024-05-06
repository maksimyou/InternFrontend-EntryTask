<script lang="ts">
  //import svelteLogo from './assets/svelte.svg'
  //import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
import axios from 'axios'
import {onMount} from 'svelte'

const conversion_rates:Array<string> = [
"RUB",
"AED",
"AFN",
"ALL",
"AMD",
"ANG",
"AOA",
"ARS",
"AUD",
"AWG",
"AZN",
"BAM",
"BBD",
"BDT",
"BGN",
"BHD",
"BIF",
"BMD",
"BND",
"BOB",
"BRL",
"BSD",
"BTN",
"BWP",
"BYN",
"BZD",
"CAD",
"CDF",
"CHF",
"CLP",
"CNY",
"COP",
"CRC",
"CUP",
"CVE",
"CZK",
"DJF",
"DKK",
"DOP",
"DZD",
"EGP",
"ERN",
"ETB",
"EUR",
"FJD",
"FKP",
"FOK",
"GBP",
"GEL",
"GGP",
"GHS",
"GIP",
"GMD",
"GNF",
"GTQ",
"GYD",
"HKD",
"HNL",
"HRK",
"HTG",
"HUF",
"IDR",
"ILS",
"IMP",
"INR",
"IQD",
"IRR",
"ISK",
"JEP",
"JMD",
"JOD",
"JPY",
"KES",
"KGS",
"KHR",
"KID",
"KMF",
"KRW",
"KWD",
"KYD",
"KZT",
"LAK",
"LBP",
"LKR",
"LRD",
"LSL",
"LYD",
"MAD",
"MDL",
"MGA",
"MKD",
"MMK",
"MNT",
"MOP",
"MRU",
"MUR",
"MVR",
"MWK",
"MXN",
"MYR",
"MZN",
"NAD",
"NGN",
"NIO",
"NOK",
"NPR",
"NZD",
"OMR",
"PAB",
"PEN",
"PGK",
"PHP",
"PKR",
"PLN",
"PYG",
"QAR",
"RON",
"RSD",
"RWF",
"SAR",
"SBD",
"SCR",
"SDG",
"SEK",
"SGD",
"SHP",
"SLE",
"SLL",
"SOS",
"SRD",
"SSP",
"STN",
"SYP",
"SZL",
"THB",
"TJS",
"TMT",
"TND",
"TOP",
"TRY",
"TTD",
"TVD",
"TWD",
"TZS",
"UAH",
"UGX",
"USD",
"UYU",
"UZS",
"VES",
"VND",
"VUV",
"WST",
"XAF",
"XCD",
"XDR",
"XOF",
"XPF",
"YER",
"ZAR",
"ZMW",
"ZWL"
  ]
let loading:boolean = false;
let rateeee:string = 'RUB';
let rateeee2:string = 'USD';
let value1 = 1
let value2 = 0 


let apiData:Array<any> = []
  let apiData2:Array<any> = []


const recalculation = async (str)=>{
// await ApiFetch()
console.log(apiData.conversion_rates[rateeee2])
  value1 = str;
  value2 = str*apiData.conversion_rates[rateeee2] 
  
}

const recalculation2 = async (str)=>{
  //await ApiFetch2()
  console.log(apiData2.conversion_rates[rateeee],apiData2.conversion_rates[rateeee2],rateeee,rateeee2,apiData2)
  value1 = apiData2.conversion_rates[rateeee]*str
  value2 = str;
  
}



const ApiFetch = async (str:string,dev:boolean):void=>{
    let url = `https://v6.exchangerate-api.com/v6/557fbdd846b794d2bb18810e/latest/${str}`
    console.log(str);
    
    loading=true
  axios.get(url)
  .then(response=>response.data)
  .then(data=>  {
    console.log(data);
    console.log('sddddddddf');
    if(dev){  recalculation(value1)}
    apiData = data;
    loading=false
  })
  .catch(error=>{
    console.log(error)
    loading=false
  
  })
}

let url2 = `https://v6.exchangerate-api.com/v6/557fbdd846b794d2bb18810e/latest/${rateeee2}`

  const ApiFetch2 = async (str:string,dev:boolean):void=>{
    loading=true
  axios.get(url2)
  .then(response=>response.data)
  .then(data=>  {
    console.log(data);
    console.log('sddddddddf');
    if(dev){  recalculation(value2)}
    apiData2 = data;
    loading=false
  })
  .catch(error=>{
    console.log(error)
    loading=false
  
  })
}


const setRateeee = (str:string)=>{
  rateeee = str;
  ApiFetch(str,true);

}

const setRateeee2 = (str:string)=>{
  rateeee2 = str;
  ApiFetch2(str,true);

}








onMount(() => {
    ApiFetch('RUB',false)
    ApiFetch2('USD',false)

		console.log(apiData,apiData2);
	});

  //watch(count, () => {
  //  // Вызов функции при изменении count
  //  console.log(`Count changed to ${count}`);
  //});

</script>

<main>
  
  <h1>Currency converter</h1>

  <div class="card">
    <Counter />
  </div>


  <div class="">
    {#if loading}
    <div class="">
      Загрузка... 
    </div>
    {:else}
	
    <div class="">

        <div class="">Выберите валюту</div>

        <div class="">
          <select bind:value={rateeee} name="" id=""  on:change={(e) => (setRateeee(e.target.value))}>
            {#each conversion_rates as rate}
            <option value={rate}>
              {rate}
            </option>
          {/each}
          </select>
          <select bind:value={rateeee2} name="" id=""  on:change={(e) => (setRateeee2(e.target.value))}>
            {#each conversion_rates as rate}
            <option value={rate}>
              {rate}
            </option>
          {/each}
          </select>
        </div>

        <div class="">
          <input bind:value={value1}  on:input={(e) => (recalculation(e.target.value))} type="text">
          <input bind:value={value2}  on:input={(e) => (recalculation2(e.target.value))} type="text">
        </div>
        <div class="">
          Соотношение валют:
          {#if apiData.result==="success"&&apiData2.result==="success"}
          <div class="">1 {rateeee} стоит {apiData.conversion_rates[rateeee2]} {rateeee2}</div>
          <div class="">1 {rateeee2} стоит {apiData2.conversion_rates[rateeee]} {rateeee}</div>
          {:else}
          <div class="">Загрузка</div>
          {/if}
        </div>
    </div>
    {/if}
  </div>

  
</main>

<style>
  /*.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }*/
  /*.read-the-docs {
    color: #888;
  }*/
</style>
