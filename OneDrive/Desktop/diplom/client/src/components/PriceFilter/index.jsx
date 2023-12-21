import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceFilter } from "../../store/slices/filtersSlice";
import s from "./priceFilter.module.css";

const PriceFilter = ({ onFilterChange }) => {
    const dispatch = useDispatch();
    const { fromPrice, toPrice } = useSelector((state) => state.filters.priceFilter)

    const handleFromPriceChange = (e) => {
        const value = parseFloat(e.target.value);
        dispatch(setPriceFilter({ fromPrice: value, toPrice }));
      };
    
      const handleToPriceChange = (e) => {
        const value = parseFloat(e.target.value);
        dispatch(setPriceFilter({ fromPrice, toPrice: value }));
      };

      useEffect(() => {
        onFilterChange({ from: fromPrice, to: toPrice });
      }, [fromPrice, toPrice, onFilterChange]);

      return (
        <div className={s.container_sort}>
          <h3 className={s.price}>Price</h3>
          <input
            className={s.from}
            type="number"
            placeholder="from"
            value={fromPrice}
            onChange={handleFromPriceChange}
          />
          <input
            className={s.to}
            type="number"
            placeholder="to"
            value={toPrice}
            onChange={handleToPriceChange}
          />
        </div>
      );
    }

    export default PriceFilter;