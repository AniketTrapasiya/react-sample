import React, { useEffect, useState } from "react";
import "./app.css";

export interface LayoutProps {
  children: React.ReactNode;
}
const data = [{ name: "AAPL" }, { name: "NEWSC" }, { name: "PAYTM" }];
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [ title, setTitle ] = useState<any>();
  useEffect(() => {
    setTitle('AAPL');
  },[])
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setTitle(value);
  };
  return (
    <div className="k-line-chart-container">
      <div className="header">
        <div>
          Stock : $
          <select
            name="title"
            className="title"
            onChange={(e) => {
              handleChange(e);
            }}
          >
            {data.map((item: any) => (
              <option value={item.name}><h3 className="k-line-chart-title">{item.name}</h3></option>
            ))}
          </select> 
        </div>
        <div>
          Interval :   
          <select>
            <option>1m</option>
            <option>5m</option>
            <option>15m</option>
          </select>
        </div>
        <div>
          Days : 
          <select>
            <option>1 day</option>  
            <option>3 day</option>
            <option>7 day</option>
          </select>
        </div>
        <button type="button">start</button>
        <button type="button">stop</button>
      </div>
      {children}
    </div>
  );
};

export default Layout;
