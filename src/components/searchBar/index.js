import React from 'react'
import style from "../../styles/SearchBar.module.scss"
import SearchItem from './searchItem'
import $ from "jquery"

export default function SearchBar({ productList, addfunction }) {
  const [listResult, setListResult] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState("");

  const changeValue = () => {
    setSearchKey($(".inputSearch").val());
  }

  React.useEffect(() => {
    $(".inputSearch").on("focus", function () {
      $(`.listResult`).fadeIn();
    });

    $(".listResult").on('click', ".serviceItem", function () {
      var id = $(this).attr("dataid");
      addfunction(id);
    })

  }, []);

  React.useEffect(() => {
    var listResult1 = [];
    productList.forEach(element => {
      if (element.id.toLocaleLowerCase().indexOf(searchKey.toLocaleLowerCase()) != -1
        || element.name.toLocaleLowerCase().indexOf(searchKey.toLocaleLowerCase()) != -1) {
        listResult1.push(element);
      }
    });
    setListResult(listResult1);
  }, [searchKey]);



  return (
    <div className={style.SearchContainer}>
      <input className={`${style.searchField} inputSearch`} onChange={changeValue}></input>
      <div className={`${style.listResult} listResult`}>
        {listResult.map((t, index) => { return (<SearchItem key={t.id} id={t.id} name={t.name}></SearchItem>) })}
      </div>
    </div>
  )
}
