'use client';
import React, { useEffect, useState, useRef } from 'react';
import { uploadImage } from '../Handle/Handle';
import Editor from 'ckeditor5-custom-build';

interface Props {
  initialValue?: string;
  onChange: (value: string) => void;
  Form?: any;
  Field?: any;
  storageBucket: string;
}

const TextEditor = ({
  initialValue,
  onChange,
  Form,
  Field,
  storageBucket,
}: Props) => {
  const [editorData, setEditorData] = useState(initialValue);
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor }: any = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
    };
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    setEditorData(initialValue);
  }, [initialValue]);

  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return loader.file
          .then((file: any) => {
            return uploadImage(file, 'editor', storageBucket)
              .then((uploadedFileUrl: any) => {
                return {
                  default: uploadedFileUrl,
                };
              })
              .catch((error: any) => {
                console.error('Lỗi khi xử lý kết quả tải lên:', error);
                throw error;
              });
          })
          .catch((error: any) => {
            console.error('Lỗi tải lên tệp tin:', error);
            throw error;
          });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div>
      {typeof window !== 'undefined' && (
        <>
          {editorLoaded ? (
            <CKEditor
              editor={Editor}
              config={{ extraPlugins: [uploadPlugin] }}
              data={editorData}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                setEditorData(data);
                onChange({ ...Form, [Field]: data });
              }}
            />
          ) : (
            'loading...'
          )}
        </>
      )}
    </div>
  );
};

export default TextEditor;
