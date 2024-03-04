"use client";

import { useEffect, useState } from "react";
import { CookingPost, ColumnsRecipe } from "@/types";

import style from "./recipe.module.css";

export default function Recipe() {
  // Columns
  const columnsRecipe: ColumnsRecipe = {
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

  const [insertData, setInsertData] = useState<ColumnsRecipe>(columnsRecipe);
  const renderFormItem = (formKey: string, column: any) => {
    return (
      <table className="row_2_table">
        <tbody>
          {column.map((list: any, index: number) => {
            return (
              <tr key={index}>
                {formKey === "ingredientList" ? (
                  <>
                    {list?.map((item: any, i: number) => (
                      <td key={i}>
                        <input
                          onChange={(e) => console.log(e)}
                          type={item?.type}
                          value={item?.value === null ? "" : item?.value}
                        />
                      </td>
                    ))}

                    {index !== 0 ? (
                      <td>
                        <button
                          onClick={(e) => {
                            handleDelButtonClick(e, formKey, index);
                          }}
                        >
                          빼기
                        </button>
                      </td>
                    ) : null}
                  </>
                ) : (
                  <>
                    <th>
                      {formKey === "foodImgList"
                        ? `${index + 1} 단계`
                        : list?.title}
                    </th>
                    <td>
                      <input
                        onChange={(e) => console.log(e)}
                        type={list?.type}
                        value={list?.value === null ? "" : list?.value}
                      />
                    </td>
                    {index !== 0 && formKey === "foodImgList" ? (
                      <td>
                        <button
                          onClick={(e) => {
                            handleDelButtonClick(e, formKey, index);
                          }}
                        >
                          빼기
                        </button>
                      </td>
                    ) : null}
                  </>
                )}
              </tr>
            );
          })}
          {/* 추가하기 버튼 */}
          {(formKey === "ingredientList" || formKey === "foodImgList") && (
            <tr>
              <td colSpan={2}>
                <button onClick={(e) => handleAddButtonClick(e, formKey)}>
                  추가하기
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const handleAddButtonClick = (e, formKey) => {
    e.preventDefault();
    const newItem = [
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
    ];
    const newItem2 = {
      id: "newItem",
      type: "text",
      value: "",
    };

    setInsertData((prevColumn: ColumnsRecipe) => {
      const updatedColumn: ColumnsRecipe = { ...prevColumn };
      updatedColumn[formKey] = [...prevColumn[formKey], newItem];
      return updatedColumn;
    });
  };

  const handleDelButtonClick = (
    e: React.MouseEvent,
    formKey: keyof ColumnsRecipe,
    index: number
  ) => {
    e.preventDefault();

    setInsertData((prevColumn: ColumnsRecipe) => {
      const updatedColumn: ColumnsRecipe = { ...prevColumn };
      const newArray = [...prevColumn[formKey]]; // 타입 단언을 통해 배열의 타입을 RecipeColumn[]로 지정합니다.
      newArray.splice(index, 1);
      updatedColumn[formKey] = newArray;
      return updatedColumn;
    });
  };

  return (
    <main className={style.main}>
      <h2 className="main_txt">요리등록</h2>
      <form>
        {Object.entries(insertData).map(([formKey, column]) => (
          <div className="insert_form" key={formKey}>
            <h3 className="tb_title">
              {formKey === "ingredientList"
                ? "재료"
                : formKey === "foodImgList"
                ? "요리단계"
                : null}
            </h3>
            {renderFormItem(formKey, column)}
          </div>
        ))}
      </form>
    </main>
  );
}
