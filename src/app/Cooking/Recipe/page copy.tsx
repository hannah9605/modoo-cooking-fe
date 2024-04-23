"use client";

import { useEffect, useState } from "react";

import { CookingPost, ColumnsRecipe } from "@/types";

import Image from "next/image";
import style from "./recipe.module.css";
import DragList from "./dragList";

import noImg from "/public/images/no_img.png";

//component
import StarScore from "@/components/starScore";
import { Console } from "console";
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
        option: [],
      },
      {
        title: "레시피 제목",
        id: "title",
        value: null,
        type: "text",
        placeholderText:
          "레시피 제목을 입력해주세요. 최대 30자까지 입력 가능합니다.",
      },
      {
        title: "서브타이틀",
        id: "subTitle",
        value: null,
        type: "text",
        placeholderText:
          "서브타이틀을 입력해주세요. 최대 30자까지 입력 가능합니다.",
      },
      {
        title: "레시피소개",
        id: "repInfo",
        value: null,
        type: "textarea",
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
        type: "StarScore",
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

  const categoryOption = [
    { txt: "밥", val: "rice" },
    { txt: "찌개", val: "WLro" },
    { txt: "반찬", val: "qkscks" },
  ];

  const [insertData, setInsertData] = useState<ColumnsRecipe>(columnsRecipe);
  const [imgFile, setImgFile] = useState(noImg);

  const handleChangeValue = (e, list, formKey) => {
    let inputValue = e.target.value;
    console.log(inputValue, list, formKey);
    const updatedInsertColumns = { ...insertData };

    updatedInsertColumns[formKey] = updatedInsertColumns[formKey].map(
      (item) => {
        if (item.id === list.id) {
          console.log({ ...item, value: inputValue });
          return { ...item, value: inputValue };
        } else {
          return item;
        }
      }
    );
    console.log(updatedInsertColumns);
    setInsertData(updatedInsertColumns);
  };
  useEffect(() => {
    const updatedInsertColumns = { ...insertData }; // 기존 데이터 복제

    // 모든 열 업데이트
    Object.keys(updatedInsertColumns).forEach((key) => {
      updatedInsertColumns[key] = updatedInsertColumns[key].map((item) => {
        if (item.id === "category") {
          return { ...item, option: categoryOption };
        }
        return item;
      });
    });

    setInsertData(updatedInsertColumns);
  }, []);

  // 등록폼 렌더링
  const renderFormItem = (formKey: string, column: any) => {
    return (
      <table key={"insert"} className={style.recipe_tb_int} id={formKey}>
        <tbody>
          {column.map((list: any, index: number) => {
            return (
              <tr key={`column ${index}`}>
                {formKey === "ingredientList" ? (
                  // formKey === "cookingUtensils" ||
                  // formKey === "seasonings" ? (
                  //재료 등록폼
                  <>
                    <td>
                      <DragList list={column} />
                    </td>
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
                    {/* 요리 기본정보 입력 formkey ="Profile"  */}
                    {list.id !== "repImg" ? <th>{list?.title}</th> : null}

                    <td
                      className={style.reg_img_wr}
                      rowSpan={list.id === "repImg" ? 8 : 1}
                    >
                      {list?.type === "file" ? (
                        //이미지업로드 일때
                        <div className="flex_col">
                          <div
                            className={
                              imgFile === noImg ? style.default_image : null
                            }
                          >
                            <Image
                              src={imgFile}
                              alt="대표이미지"
                              width={480}
                              height={380}
                              priority
                            />
                          </div>

                          <label className="flex_between" htmlFor="regImg">
                            <input
                              type="text"
                              value={list?.value?.name}
                              placeholder="선택된 파일이 없습니다."
                              disabled
                              style={{
                                maxWidth: "calc(100% -  110px)",
                              }}
                            />
                            <span
                              style={{
                                fontSize: "13px",
                              }}
                              className="btn btn_primary btn_m"
                            >
                              이미지 등록
                            </span>
                          </label>

                          <input
                            className="file_custom"
                            onChange={(e) => {
                              const file = e?.target?.files?.[0];
                              if (file) {
                                saveImgFile(file, list, formKey);
                              }
                            }}
                            type={list?.type}
                            accept="image/*"
                            id="regImg"
                          />

                          <p className={style.footer_font}>
                            - 이미지 권장 사이즈는 480px * 380 px 이상입니다.
                            (jpg, png, gif 등록 가능)
                          </p>
                        </div>
                      ) : list?.type === "select" ? (
                        <select
                          name={list.id}
                          onChange={(e) => {
                            handleChangeValue(e, list, formKey);
                          }}
                        >
                          <option value="" hidden>
                            선택해주세요
                          </option>
                          {list?.option?.map(
                            (
                              opItem: { txt: string; val: string }[],
                              opInndex: number
                            ) => (
                              <option key={opInndex} value={opItem?.val}>
                                {opItem?.txt}
                              </option>
                            )
                          )}
                          ?.
                        </select>
                      ) : list?.type === "StarScore" ? (
                        <StarScore
                          score={5}
                          data={list}
                          setData={setInsertData}
                          page="insert"
                        />
                      ) : list?.id === "repInfo" ? (
                        <textarea
                          id={list?.id}
                          placeholder="요리 소개를 입력해주세요.&#10;간단해도 괜찮아요"
                          onChange={(e) => {
                            handleChangeValue(e, list, formKey);
                          }}
                        ></textarea>
                      ) : (
                        <input
                          onChange={(e) => {
                            handleChangeValue(e, list, formKey);
                          }}
                          type={list?.type}
                          value={list?.value === null ? "" : list?.value}
                          placeholder={list?.placeholderText}
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

  const saveImgFile = (file: File, list: any, formKey: string) => {
    const updatedInsertColumns = {
      ...insertData,
      [formKey]: insertData[formKey].map((oddList) => {
        if (oddList.id === list.id) {
          console.log(file?.name);

          return {
            ...oddList,
            value: file,
          };
        }
        return oddList;
      }),
    };
    setInsertData(updatedInsertColumns);

    // 이미지 미리보기
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
        <button type="submit"> 등록 / 수정하기</button>
      </form>
    </main>
  );
}
