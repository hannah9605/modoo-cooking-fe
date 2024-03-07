"use client";

import { useEffect, useState } from "react";
import { CookingPost, ColumnsRecipe } from "@/types";

import Image from "next/image";
import Link from "next/link";
import style from "./recipe.module.css";

import noImg from "/public/images/no_img.png";
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
        title: "카테고리",
        id: "category",
        value: null,
        type: "select",
      },
      {
        title: "레시피 제목",
        id: "title",
        value: null,
        type: "text",
      },
      {
        title: "서브타이틀",
        id: "subTitle",
        value: null,
        type: "text",
      },
      {
        title: "레시피소개",
        id: "repInfo",
        value: null,
        type: "text",
      },
      {
        title: "기준(인분)",
        id: "people",
        value: null,
        type: "text",
      },
      {
        title: "조리시간",
        id: "time",
        value: null,
        type: "text",
      },
      {
        title: "난이도",
        id: "level",
        value: null,
        type: "select",
      },
    ],
    cookingUtensils: [
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
    seasonings: [
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
        title: "1 단계",
        id: "repImg",
        imgFile: null,
        value: null,
        type: "text",
      },
    ],
  };

  const [insertData, setInsertData] = useState<ColumnsRecipe>(columnsRecipe);
  const [imgFile, setImgFile] = useState(noImg);

  // 등록폼 렌더링
  const renderFormItem = (formKey: string, column: any) => {
    return (
      <table className="row_2_table">
        <tbody>
          {column.map((list: any, index: number) => {
            return (
              <tr key={index}>
                {formKey === "ingredientList" ||
                formKey === "cookingUtensils" ||
                formKey === "seasonings" ? (
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
                    <th>{list?.title}</th>
                    <td>
                      {list?.type === "file" ? (
                        //이미지 일때
                        <div className="flex_col">
                          <Image
                            src={imgFile}
                            alt="대표이미지"
                            width={480}
                            height={380}
                          />
                          <input
                            onChange={(e) => {
                              const file = e?.target?.files?.[0];
                              if (file) {
                                saveImgFile(file);
                              }
                            }}
                            type={list?.type}
                            // value={list?.value === null ? "" : list?.value}
                            accept="image/*"
                            id="regImg"
                          />
                          <p>
                            - 이미지 권장 사이즈는 480px * 380 px 이상입니다.
                            (jpg, png, gif 등록 가능)
                          </p>
                        </div>
                      ) : (
                        <input
                          onChange={(e) => console.log(e)}
                          type={list?.type}
                          value={list?.value === null ? "" : list?.value}
                        />
                      )}
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
          {formKey !== "Profile" && (
            <tr>
              <td colSpan={2}>
                <button onClick={(e) => handleAddButtonClick(e, formKey)}>
                  + {formKey === "foodImgList" ? "조리 순서" : "재료"} 추가
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  const saveImgFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  //추가하기 >  등록폼 1행 추가
  const handleAddButtonClick = (e: React.MouseEvent, formKey: string) => {
    e.preventDefault();

    let newItem: any;
    if (
      formKey === "ingredientList" ||
      formKey === "cookingUtensils" ||
      formKey === "seasonings"
    ) {
      newItem = [
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
    } else if (formKey === "foodImgList") {
      newItem = {
        title: `${insertData[formKey].length + 1} 단계`,
        id: "repImg",
        imgFile: null,
        value: null,
        type: "text",
      };
    }

    setInsertData((prevColumn: ColumnsRecipe) => {
      const updatedColumn: ColumnsRecipe = { ...prevColumn };
      updatedColumn[formKey] = [...prevColumn[formKey], newItem];
      return updatedColumn;
    });
  };
  // 빼기 > 등록폼 1행 삭제
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
      <h2 className="main_txt">요리 등록</h2>
      <form>
        {Object.entries(insertData).map(([formKey, column]) => (
          <div className="insert_form" key={formKey}>
            <h3 className="tb_title">
              {formKey === "cookingUtensils"
                ? "조리 도구"
                : formKey === "seasonings"
                ? "양념 재료"
                : formKey === "ingredientList"
                ? "기본 재료"
                : formKey === "foodImgList"
                ? "조리 순서"
                : null}
            </h3>
            {renderFormItem(formKey, column)}
          </div>
        ))}
        <button type="submit">등록 / 수정하기</button>
      </form>
    </main>
  );
}
