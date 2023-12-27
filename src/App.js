import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Typography,
  AppBar,
  Toolbar
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from "react-redux";
import { fetchContent } from "./redux-toolkit/reducers/contentSlice";
import Media from './Media'

const useStyles = makeStyles({
  centerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '100vh',
    marginTop: 100
  },
});

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    contents,
    success
  } = useSelector((state) => state.contentSlice);
  const [itemsToShow, setItemsToShow] = useState(5); // จำนวนรายการที่จะแสดงเริ่มต้น
  const totalItems = contents.length; // รวมจำนวนรายการทั้งหมด
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(fetchContent());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && success) {
      // เมื่อ element มีการ intersect (อยู่ในมุมมองของผู้ใช้), เพิ่มจำนวนรายการที่จะแสดง
      setItemsToShow((prev) => Math.min(prev + 5, totalItems));
    }
  };

  useEffect(() => {
    if (success && loadMoreRef.current) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // เมื่อ element อยู่ในมุมมองของผู้ใช้ 10%
      };

      const observer = new IntersectionObserver(handleObserver, options);

      // เพิ่ม element ที่ต้องตรวจสอบ
      observer.observe(loadMoreRef.current);

      // ลบ observer เมื่อ component unmount
      return () => {
        observer.disconnect();
      };
    }
  }, [loadMoreRef, success]);

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h2">Loading UI and Streaming</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.centerColumn}
      >
        <Grid item>
          {contents.slice(0, itemsToShow).map((item, index) => (
            <div key={index}>
              <Media loading={false} />
            </div>
          ))}

          {/* ให้ ref ไปยัง element ที่ต้องการตรวจสอบ */}
          <div ref={loadMoreRef} style={{ height: '10px', background: 'transparent' }}></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
