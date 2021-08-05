import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { cats } from "./catGif";
import { useEffect, useState } from "react";
import { Grid, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});
let deltaX = -5;

function App() {
  const classes = useStyles();
  const [value, setValue] = useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [idShow, setIdShow] = useState(0);
  const [x, setX] = useState(30);
  const [color, setColor] = useState(randomColor());

  useEffect(() => {
    setTimeout(() => {
      setIdShow(1 + ((idShow + 1) % (cats.length - 1)));
      if ((x <= -25 && deltaX < 0) || (x >= 100 && deltaX > 0)) {
        deltaX *= -1;
      }

      setX(x + deltaX);
      if (x % 25 === 0) setColor(randomColor());
    }, value * 10 + 50);
  }, [idShow]);
  return (
    <Root>
      <RootSlider>
        <Grid container spacing={2}>
          <Grid item xs>
            <Slider
              value={value}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
            />
          </Grid>
        </Grid>
      </RootSlider>
      <Cat color={color} x={x}>
        {cats[idShow]}
      </Cat>
    </Root>
  );
}
const RootSlider = styled.div`
  width: 200px;
  margin: auto;
`;
const Root = styled.div`
  background-color: black;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Cat = styled.div`
  user-select: none;
  display: block;
  font-size: 0.5rem;
  color: ${(props) => props.color};
  transform: translateX(${(props) => props.x}%);
  left: 0%;
  font-family: monospace;
  top: 50px;
  position: absolute;
  white-space: pre;
  @media (max-width: 467px) {
    font-size: 5px;
  }
`;
export default App;
