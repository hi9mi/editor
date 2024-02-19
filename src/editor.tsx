import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styles from "./editor.module.css";
// @ts-expect-error
import Sk from "skulpt";

const initialCode = [
  "def greet(name):",
  '\treturn "Привет, " + name',
  'name = input("Введите ваше имя: ")',
  "print(greet(name))",
].join("\n");

export const Editor = () => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState("");
  const monacoEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const monacoElCurrent = monacoEl.current;
    if (monacoElCurrent) {
      setEditor(editor => {
        if (editor) return editor;

        return monaco.editor.create(monacoElCurrent, {
          value: initialCode,
          language: "python",
          theme: "vs-dark",
          minimap: {
            enabled: false,
          },
        });
      });
    }

    return () => editor?.dispose();
  }, [editor]);

  useEffect(() => {
    Sk.configure({
      output: (text: string) => {
        setOutput(prevOutput => prevOutput + text + "\n");
      },
    });
  }, []);

  const handleRunCode = () => {
    const code = editor?.getValue();
    if (!code) return;

    Sk.misceval
      .asyncToPromise(() => {
        return Sk.importMainWithBody("<stdin>", false, code, true);
      })
      .then(null, (err: unknown) => {
        if (err instanceof Error) {
          setOutput(err.toString());
        }
      });
  };

  const handleClearResults = () => {
    setOutput("");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleRunCode}>Run code</button>
      </header>
      <div className={styles.editor} ref={monacoEl}></div>
      <div className={styles.output}>
        <div className={styles.outputTop}>
          <h2>Output:</h2>
          <button onClick={handleClearResults}>Clear</button>
        </div>
        <pre>{output}</pre>
      </div>
      <div className={styles.description}>
        {/* prettier-ignore */}
        <pre>
{`Описание задачи

Создать простой браузерный редактор python кода и его выполнения. 

Основные элементы:

    Редактор 

    Терминал для вывода 

    Окно с описанием задания 

    Кнопка запуска кода 

Все элементы должны быть на 1 странице. Расположение на ваш выбор. 

Для редактора можно использовать Монако или Ace. С подсвеченным синтаксисом Python. 

    1. https://microsoft.github.io/monaco-editor/ 
    
    2. https://ace.c9.io/ 

Для js копмилятора python использовать skulpt 

    1. https://skulpt.org/ 

Простенькое браузерное IDE должно быть рабочим.

Стэк React(Vue/Next.js) + NodeJs.`}
        </pre>
      </div>
    </div>
  );
};
