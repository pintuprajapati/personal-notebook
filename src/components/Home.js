import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props; // Destructuring
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
