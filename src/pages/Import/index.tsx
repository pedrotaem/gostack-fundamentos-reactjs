import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    // uploadedFiles.map(uploadfile => {
    //   data.append(uploadfile.name, uploadfile.file);
    //   console.log(uploadfile.file);
    //   return uploadfile;
    // });

    // console.log(data);

    // TODO

    try {
      uploadedFiles.forEach(file => {
        data.append('file', file.file);
      });
      await api.post('/transactions/import', data);
      history.push('/');
      console.log(data);
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    console.log(files);
    const uploadedfilestotal = [...uploadedFiles];
    files.map(fileinfo => console.log(fileinfo.name));
    const addfiles = files.map(file => ({
      name: file.name,
      readableSize: filesize(file.size),
      file,
    }));
    console.log(addfiles);
    addfiles.map(addfile => {
      uploadedfilestotal.push(addfile);
      return addfile;
    });

    setUploadedFiles(uploadedfilestotal);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
