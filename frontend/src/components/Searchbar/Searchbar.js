import '../../assets/styles/neumorphism.css';
// TODO (대체) import { styles } from '../../assets/styles/neumorphism';

const Searchbar = () => {
  return (
    <div className="search">
      <input type="text" className="search__input" placeholder="Search" />
      <div className="icon search__icon">
        <ion-icon name="search"></ion-icon>
      </div>
    </div>
  );
};

export default Searchbar;
