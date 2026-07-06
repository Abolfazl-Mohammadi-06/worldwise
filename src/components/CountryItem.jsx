import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
      <li className={styles.countryItem}>
          <img src={country.emoji} alt={country.country} width={30}/>
          <span>{country.country}</span>
      </li>
  );
}

export default CountryItem;
