"use client";

import { useState } from "react";
import { CookingPost } from "@/types";

export default function Recipe() {
  // Columns
  const columnsRecipe = {
    Profile: [
      {
        title: "대표이미지",
        id: "repImg",
        value: null,
        type: "file",
      },
      {
        title: "레시피 제목",
        id: "title",
        value: null,
        type: "text",
      },
      {
        title: "요리소개",
        id: "repImg",
        value: null,
        type: "text",
      },
    ],
    ingredientList: [
      [
        {
          id: "name",
          value: null,
          type: "text",
        },
        {
          id: "measurement",
          value: null,
          type: "text",
        },
      ],
    ],
    foodImgList: [
      {
        title: "1단계",
        id: "repImg",
        imgFile: null,
        value: null,
        type: "text",
      },
    ],
  };

  // const defaultInsertData: CookingPost = {
  //   title: "",
  //   author: "",
  //   detail: "",
  //   score: null,
  //   duration: "",
  //   ingredientList: [
  //     {
  //       name: "",
  //       measurement: "",
  //     },
  //     {
  //       name: "",
  //       measurement: "",
  //     },
  //   ],
  //   foodImgList: [
  //     {
  //       content: "",
  //     },
  //   ],
  // };

  const [insertData, setInsertData] = useState(columnsRecipe);

  console.log(insertData);

  const renderFormItem = (_, column: any) => {
    return (
      <table className="row_2_table">
        <thead></thead>
        <tbody>
          {column.map((item: any, index: number) => (
            <tr key={index}>
              <th>{item?.title}</th>
              <td>
                <input
                  // onChange={(e) => handleInputChange(e, formKey, item, column)}
                  type={item?.type}
                  value={item?.value}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <main>
      <h2 className="main_txt">요리등록</h2>
      <form>
        {Object.entries(columnsRecipe).map(([formKey, column]) => (
          <div className="insert_form" key={formKey}>
            <div className="tb_title">
              {formKey === "ingredientList"
                ? "재료"
                : formKey === "ㄹㄹ"
                ? "요리단계"
                : null}
            </div>
            {renderFormItem(formKey, column)}
          </div>
        ))}
        ;
        {/* <ul>
          <li>
            <p>대표이미지</p>
            <input type="file" />
          </li>
          <li>
            <p>레시피제목</p>
            <input type="text" />
          </li>
          <li>
            <p>요리소개</p>
            <textarea></textarea>
          </li>
        </ul>
        <h3 className="sub_txt">재료</h3>
        <table>
          <thead>
            <tr>
              <th>종류</th>
              <th>계량</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button onClick={() => {}}>재료 추가하기</button>
              </td>
            </tr>
          </tbody>
        </table> */}
      </form>
    </main>
  );
}
