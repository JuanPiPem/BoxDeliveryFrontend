"use client";
import React, {useState} from "react";
import Header from "commons/header/Header";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import s from "./swornDeclaration.module.scss";

const SwornDeclaration = ()=>{
  const [cuestionA, setCuestionA] = useState("");
  const [cuestionB, setCuestionB] = useState("");
  const [cuestionC, setCuestionC] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, cuestion: string) => {
    const selectedOption = event.target.value;
    if (cuestion === 'A') {
      setCuestionA(selectedOption);
    } else if (cuestion === 'B') {
      setCuestionB(selectedOption);
    } else if (cuestion === 'C') {
      setCuestionC(selectedOption);
    }

    console.log(cuestionA,cuestionB,cuestionC)
  };

  return(
    <>
    <div className={s.swornDeclarationContainer}>

      <Header text="declaración jurada"/>
      <div className={s.declarationContainer}>
        <div>
          <div className={s.span}>Requerido*</div>
          <form action=""className={s.cuestion}>
          <text>¿Ha consumido bebidas alcohólicas en las últimas 12 horas?</text>
          <div className={s.line}></div>
           <div className={s.customRadio}>
              <label htmlFor=""> <input onChange={(e) => handleOptionChange(e, 'A')} type="radio" name="response" id="" value="si" />si </label>
         
              <label htmlFor=""> <input onChange={(e) => handleOptionChange(e, 'A')} type="radio" name="response" id=""value="no" />no </label>
           </div>
          
          </form>
        </div>
        
        <div>  
          <div className={s.span}>Requerido*</div>
          <form action="" className={s.cuestion}>
        
          <text>¿Usted está haciendo uso de algún tipo de medicamento psicoactivo?</text>
          <p>por ejemplo, tranquilizantes, antigripales, antialergicos o para insomnios</p>
          <div className={s.line}></div>
          <div className={s.customRadio}>
            <label htmlFor=""> <input onChange={(e) => handleOptionChange(e, 'B')} type="radio" name="response" id="" value="si" />si </label>
         
            <label htmlFor=""> <input onChange={(e) => handleOptionChange(e, 'B')} type="radio" name="response" id=""value="no" />no </label>
           </div>
          </form>
        </div>

         <div> 
          <div className={s.span}>Requerido*</div>
          <form action="" className={s.cuestion}>
          <text>¿Tiene usted algún problema familiar, emocional o de cualquier tipo que lo distraiga?</text>
          <div className={s.line}></div>
          <div className={s.customRadio}>
           <label htmlFor=""> <input onChange={(e) => handleOptionChange(e, 'C')} type="radio" name="response" id="" value="si" />si </label>
         
           <label htmlFor=""> <input onChange={(e) => handleOptionChange(e, 'C')} type="radio" name="response" id=""value="no" />no </label>
           </div>
          </form>
        </div>
          
          <div className={s.btnContinue}>
              <ButtonDarkBlue text="continuar"/>
          </div>
         
      </div>

    </div>
    </>
  )
}

export default SwornDeclaration