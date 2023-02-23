import './Questoes.scss'
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../services/firebase'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from "mui-datatables";

export const Questoes = () => {

  const [questoes, setQuestoes] = useState<any>(undefined)

  useEffect(() => {
    if (questoes === undefined) {
      getQuestoes()
    }
  }, [questoes])

  async function getQuestoes() {
    const querySnapshot = await getDocs(collection(db, "questoes"));
    const questoesT: any = []
    querySnapshot.forEach((doc) => {
      let questao = doc.data()
      questoesT.push(questao)
    });
    setQuestoes(questoesT)
  }

  const columns = [
    {
      name: "Pergunta",
      label: "Questão",
      options: {
        filter: true,
        sort: false,
      }
    },

    // {
    //   name: "active",
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <FormControlLabel
    //           label={value ? "Yes" : "No"}
    //           value={value ? "Yes" : "No"}
    //           control={
    //             <Switch color="primary" checked={value} value={value ? "Yes" : "No"} />
    //           }
    //           onChange={(event: any) => {
    //             toggleActiveUser(tableMeta.rowData[2], 'active', !value)
    //             updateValue(event.target.value === "Yes" ? false : true);
    //           }}
    //         />
    //       );

    //     }
    //   }
    // }
  ];

  const getMuiTheme = () => createTheme({
    components: {
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
          }
        }
      }
    }
  })

  return (
    <div className='containerQuestoes'>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Questoes"}
          data={questoes}
          columns={columns}
        />
      </ThemeProvider >
    </div >
  )
}