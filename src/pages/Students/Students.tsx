import './Students.scss'
import React, { useState, useEffect, useCallback, useContext, ReactNode} from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import MUIDataTable from "mui-datatables";
import { AuthContext } from '../../context/context';
import { db } from '../../services/firebase'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const Students = () => {

  const [alunos, setAlunos] = useState<any>(undefined)
  const { toggleActiveUser } = useContext(AuthContext)

  useEffect(() => {
    if (alunos) {
      console.table(alunos)
    }
    else {
      getAlunos()
    }
  }, [alunos])

  async function getAlunos() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const alunosT: any = []
    querySnapshot.forEach((doc) => {
      let alu = doc.data()
      // if (alu.role === 'aluno')
        alunosT.push(alu)
    });
    setAlunos(alunosT)
  }

  const columns = [
    {
      name: "role",
      label: "Tipo",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "name",
      label: "Nome",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "active",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              label={value ? "Yes" : "No"}
              value={value ? "Yes" : "No"}
              control={
                <Switch color="primary" checked={value} value={value ? "Yes" : "No"} />
              }
              onChange={(event: any) => {
                toggleActiveUser(tableMeta.rowData[2], 'active', !value)
                updateValue(event.target.value === "Yes" ? false : true);
              }}
            />
          );

        }
      }
    }
  ];

  const options  = {
    filterType: 'checkbox',
    search: false,
    viewColumns: false,
    download: true,
    print: false,
    filter: false,
    rowsPerPage:1,
  };

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
    <div className='containerAlunos'>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Alunos"}
          data={alunos}
          columns={columns}
          options={options}
        />

      </ThemeProvider>

    </div>
  )
}