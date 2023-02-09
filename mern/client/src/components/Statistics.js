import React, { useEffect } from "react";
import { CChart, CChartBar } from '@coreui/react-chartjs';
import StatisticsTable from "./StatisticsTable";

export default function Statistics() {
  const data = React.useRef();
  const [loaded, setIsLoading] = React.useState(false);

  const numberOfDrinks = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinkscount")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
  );

  const alcoholicDrinks = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksalcoholic")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
  );


  const mostRatedDrinks = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/mostrateddrinks")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
  );

  const mostUsedIngredients = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksingredients")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
  );

  const mostUsedGlass = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksglass")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
  );

  const longestRecipe = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksrecipemax")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          resolve(data[0].length);
        }
        else{
          resolve(0);
        }
      })
  );

  const shortestRecipe = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksrecipemin")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          resolve(data[0].length);
        }
        else{
          resolve(0);
        }
      })
  );

  const averageRecipe = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksrecipeavg")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          resolve(data[0].avg);
        }
        else{
          resolve(0);
        }
      })
  );

  const maxIngredients = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksingredientsmax")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          resolve(data[0].length);
        }
        else{
          resolve(0);
        }
      })
  );

  const minIngredients = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksingredientsmin")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          resolve(data[0].length);
        }
        else{
          resolve(0);
        }
      })
  );

  const avgIngredients = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksingredientsavg")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          resolve(data[0].avg);
        }
        else{
          resolve(0);
        }
      })
  );


  async function getData() {
    try {
      const number = await numberOfDrinks;
      data.number = number;
      const alcohol = await alcoholicDrinks;
      data.alcohol = alcohol;
      const nonalcohol = (await numberOfDrinks) - (await alcoholicDrinks);
      data.nonalcohol = nonalcohol;

      const mostRated = await mostRatedDrinks;
      data.mostRated = mostRated;
      data.mostRated1 = JSON.stringify(mostRated[0]._id);
      data.mostRated2 = JSON.stringify(mostRated[1]._id);
      data.mostRated3 = JSON.stringify(mostRated[2]._id);
      data.mostRated4 = JSON.stringify(mostRated[3]._id);
      data.mostRated5 = JSON.stringify(mostRated[4]._id);
      data.mostRated1value = JSON.stringify(mostRated[0].count);
      data.mostRated2value = JSON.stringify(mostRated[1].count);
      data.mostRated3value = JSON.stringify(mostRated[2].count);
      data.mostRated4value = JSON.stringify(mostRated[3].count);
      data.mostRated5value = JSON.stringify(mostRated[4].count);

      
      const mostUsedIn = await mostUsedIngredients;
      data.mostUsedIn1 = JSON.stringify(mostUsedIn[0]._id);
      data.mostUsedIn2 = JSON.stringify(mostUsedIn[1]._id);
      data.mostUsedIn3 = JSON.stringify(mostUsedIn[2]._id);
      data.mostUsedIn4 = JSON.stringify(mostUsedIn[3]._id);
      data.mostUsedIn5 = JSON.stringify(mostUsedIn[4]._id);
      data.mostUsedIn1value = JSON.stringify(mostUsedIn[0].count);
      data.mostUsedIn2value = JSON.stringify(mostUsedIn[1].count);
      data.mostUsedIn3value = JSON.stringify(mostUsedIn[2].count);
      data.mostUsedIn4value = JSON.stringify(mostUsedIn[3].count);
      data.mostUsedIn5value = JSON.stringify(mostUsedIn[4].count);

      const mostUsedGl = await mostUsedGlass;
      data.mostUsedGl1 = JSON.stringify(mostUsedGl[0]._id);
      data.mostUsedGl2 = JSON.stringify(mostUsedGl[1]._id);
      data.mostUsedGl3 = JSON.stringify(mostUsedGl[2]._id);
      data.mostUsedGl4 = JSON.stringify(mostUsedGl[3]._id);
      data.mostUsedGl5 = JSON.stringify(mostUsedGl[4]._id);
      data.mostUsedGl1value = JSON.stringify(mostUsedGl[0].count);
      data.mostUsedGl2value = JSON.stringify(mostUsedGl[1].count);
      data.mostUsedGl3value = JSON.stringify(mostUsedGl[2].count);
      data.mostUsedGl4value = JSON.stringify(mostUsedGl[3].count);
      data.mostUsedGl5value = JSON.stringify(mostUsedGl[4].count);

      const longestRec = await longestRecipe;
      data.longestRec = longestRec;
      const shortestRec = await shortestRecipe;
      data.shortestRec = shortestRec;
      const averageRec = await averageRecipe;
      data.averageRec = averageRec;

      const maxIng = await maxIngredients;
      data.maxIng = maxIng;
      const minIng = await minIngredients;
      data.minIng = minIng;
      const avgIng = await avgIngredients;
      data.avgIng = avgIng;

    } catch (err) {
      console.log(err);
    }

    return data;
  }
  useEffect(() => {
    getData().then((data) => {
      setIsLoading(true);
    });
  }, []);

  function updateData(chart) {
    chart.update();
  }

  
  let chart1data = {
    labels: ["Drinki alkoholowe", "Drinki bezalkoholowe"],
    datasets: [
      {
        label: "Liczba drinków",
        data: [data.alcohol, data.nonalcohol],
        backgroundColor: ['magenta', 'darkviolet'],
      },
    ],
  };

  let chart2data = {
    labels: [
      data.mostRated1,
      data.mostRated2,
      data.mostRated3,
      data.mostRated4,
      data.mostRated5,
    ],
    datasets: [
      {
        label: "Najczęściej oceniane drinki",
        data: [
          data.mostRated1value,
          data.mostRated2value,
          data.mostRated3value,
          data.mostRated4value,
          data.mostRated5value,
        ],
        backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
      },
    ],
  };


  let chart3data = {
    labels: [
      data.mostUsedIn1,
      data.mostUsedIn2,
      data.mostUsedIn3,
      data.mostUsedIn4,
      data.mostUsedIn5,
    ],
    datasets: [
      {
        label: "Najczęściej używane składniki",
        data: [
          data.mostUsedIn1value,
          data.mostUsedIn2value,
          data.mostUsedIn3value,
          data.mostUsedIn4value,
          data.mostUsedIn5value,
        ],
        backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
      },
    ],
  };

  let chart4data = {
    labels: [
      data.mostUsedGl1,
      data.mostUsedGl2,
      data.mostUsedGl3,
      data.mostUsedGl4,
      data.mostUsedGl5,
    ],
    datasets: [
      {
        label: "Najczęściej używane szkło",
        data: [
          data.mostUsedGl1value,
          data.mostUsedGl2value,
          data.mostUsedGl3value,
          data.mostUsedGl4value,
          data.mostUsedGl5value,
        ],
        backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
      },
    ],
  };



  if (loaded) return (
    <div className="statistics">
        <div className="pie-chart">
          <CChart
            type="pie"
            data={chart1data}
            options={{
              legend: {
                position: 'top',
                labels: {
                  fontSize: 14,
                  boxWidth: 20,
                },
              },
              responsive: false,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Types of drinks',
                fontSize: 20,
              },
            }}
          />
        </div>
        <div className="bar-chart">
          <CChart
            type="bar"
            data={chart2data}
            options={{
              legend: {
                position: 'top',
                labels: {
                  fontSize: 14,
                  boxWidth: 20,
                },
              },
              responsive: false,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Most rated drinks',
                fontSize: 20,
              },
            }}
          />
      </div>
      <div className="bar-chart">
        <CChartBar
          type="bar"
          data={chart3data}
          options={{
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Most used ingredients',
              fontSize: 20,
            },
            responsive: false,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="doughnut-chart">
        <CChart
          type="doughnut"
          data={chart4data}
          options={{
            legend: {
              position: 'top',
              labels: {
                fontSize: 14,
                boxWidth: 20,
              },
            },
            responsive: false,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Most used glass types',
              fontSize: 20,
            },
          }}
        />
      </div>
      <StatisticsTable
        statistics={[
          { name: 'Liczba drinków', value: data.number},
          { name: 'Liczba alkoholowych drinków', value: data.alcohol },
          { name: 'Liczba bezalkoholowych drinków', value: data.nonalcohol },
          {
            name: 'Najczęściej oceniane drinki',
            value: data.mostRated1 + ', ' + data.mostRated2 + ', ' + data.mostRated3 + ', ' + data.mostRated4 + ', ' + data.mostRated5,
          },
          {
            name: 'Najczęściej używane składniki',
            value: data.mostUsedIn1 + ', ' + data.mostUsedIn2 + ', ' + data.mostUsedIn3 + ', ' + data.mostUsedIn4 + ', ' + data.mostUsedIn5
          },
          {
            name: 'Najczęściej używane szkło',
            value: data.mostUsedGl1 + ', ' + data.mostUsedGl2 + ', ' + data.mostUsedGl3 + ', ' + data.mostUsedGl4 + ', ' + data.mostUsedGl5
          },
          {
            name: 'Najdłuższy przepis',
            value: data.longestRec
          },
          {
            name: 'Najkrótszy przepis',
            value: data.shortestRec
          },
          {
            name: 'Średnia długość przepisu',
            value: data.averageRec
          },
          {
            name: 'Największa liczba składników',
            value: data.maxIng
          },
          {
            name: 'Najmniejsza liczba składników',
            value: data.minIng
          },
          {
            name: 'Średnia liczba składników',
            value: data.avgIng
          },
        ]}
      />
    </div>
  )
  else return (
    <div className="statistics">
      <h1>Ładowanie...</h1>
    </div>
  )
}