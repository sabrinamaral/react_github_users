import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useGlobalContext();
  let languages = repos.reduce((acc, curr) => {
    const { language, stargazers_count } = curr;
    if (!language) return acc;
    if (!acc[language]) {
      acc[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      acc[language] = {
        ...acc[language],
        value: acc[language].value + 1,
        stars: acc[language].stars + 1,
      };
    }
    return acc;
  }, {});
  const mostUseLanguages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // stars per language
  const mostPopular = Object.values(languages).sort((a, b) => {
    return b.stars - b.stars;
  });
  const starsPerLanguage = mostPopular
    .map((item) => {
      return {
        label: item.label,
        value: item.stars,
      };
    })
    .slice(0, 5);

  // stars and forks

  let { stars, forks } = repos.reduce(
    (acc, curr) => {
      const { forks_count, stargazers_count, name } = curr;
      acc.stars[stargazers_count] = { label: name, value: stargazers_count };
      acc.forks[forks_count] = { label: name, value: forks_count };
      return acc;
    },
    {
      stars: {},
      forks: {},
    }
  );
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUseLanguages} />
        <Column3D data={stars} />
        <Doughnut2D data={starsPerLanguage} />
        <Bar3D data={forks} />
        {/* <ExampleChart data={chartData} /> */}
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
