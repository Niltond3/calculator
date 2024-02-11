"use client"
import {Button} from "@/components/Button";
import { onBracketClosePress, onBracketOpenPress, onDeletPress, onEqualPress, onNumberPress } from "@/components/Button/ButtonRoot";
import {Dialog} from "@/components/Dialog";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";


export interface screenProps {
  lastCalc: string;
  calc: string;
  negative: boolean;
  bracketClose: string;
}

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [screen, setScreen] = React.useState<screenProps>({
    lastCalc:'',
    calc:'0',
    negative:false,
    bracketClose:'',
  });

  const keyDownEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const mapKeyboardPress = {
      0: () => onNumberPress(setScreen, screen, e.key),
      1: () => onNumberPress(setScreen, screen, e.key),
      2: () => onNumberPress(setScreen, screen, e.key),
      3: () => onNumberPress(setScreen, screen, e.key),
      4: () => onNumberPress(setScreen, screen, e.key),
      5: () => onNumberPress(setScreen, screen, e.key),
      6: () => onNumberPress(setScreen, screen, e.key),
      7: () => onNumberPress(setScreen, screen, e.key),
      8: () => onNumberPress(setScreen, screen, e.key),
      9: () => onNumberPress(setScreen, screen, e.key),
      '(': () => onBracketOpenPress(setScreen, screen),
      ')': () => onBracketClosePress(setScreen, screen),
      '-': () => onNumberPress(setScreen, screen, ` ${e.key} `),
      '+': () => onNumberPress(setScreen, screen, ` ${e.key} `),
      '%': () => onNumberPress(setScreen, screen, ` ${e.key} `),
      '/': () => onNumberPress(setScreen, screen, ` ${e.key} `),
      '=': () => onEqualPress(setScreen, screen, searchParams, router),
      'Enter': () => onEqualPress(setScreen, screen, searchParams, router),
      'Backspace': () => onDeletPress(setScreen, screen),
    }
    const key = e.key as keyof typeof mapKeyboardPress
    if (mapKeyboardPress[key]) mapKeyboardPress[key]()

  }

  return (
    <main className="h-screen bg-white text-slate-800 antialiased dark:bg-slate-900 dark:text-slate-100 flex justify-center items-center" onKeyDown={keyDownEvent} tabIndex={0}>
    <div className="flex h-fit flex-col border border-white p-2 rounded-3xl " >
      <div className="border-white/20 border p-2 m-2 rounded-2xl flex flex-col max-w-[256px]">
          <div className="flex">
            <Dialog.Root>
              <Dialog.Trigger>
                <Image
                  src="/history.svg"
                  alt="history icon"
                  className="dark:invert opacity-20 hover:opacity-60 transition h-auto"
                  width={16}
                  height={24}
                  priority
                />
              </Dialog.Trigger>
              <Dialog.Body showBackdrop/>
            </Dialog.Root>
            <div className="flex justify-end items-end w-full">
              {screen.lastCalc && <span className="text-xs opacity-80">{screen.lastCalc}</span>}
            </div>
          </div>
          <div className="flex justify-end">
          <span className="flex justify-end max-w-[235px] whitespace-nowrap float-right overflow-hidden">
              {screen.negative && '-'}{screen.calc}{screen.bracketClose && <span className="opacity-60">{screen.bracketClose}</span>}
          </span>
          </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-52">
        <div>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Function action="ce">CE</Button.Function>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Function action="c">C</Button.Function>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Function action="delete">
              <Image
                src="/delete.svg"
                alt="delete icon"
                className="dark:invert h-auto"
                width={16}
                height={24}
              />
            </Button.Function>
          </Button.Root>
          </div>
          <div>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Function action="(">(</Button.Function>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Function action=")">)</Button.Function>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Operator>%</Button.Operator>
          </Button.Root>
          </div>
          <div className="flex flex-row flex-wrap">
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={7}/>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={8} />
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={9}/>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={4}/>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={5}/>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={6}/>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={1}/>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={2}/>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={3}/>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Function action="change">
              <Image
                src="/plusMinus.svg"
                alt="plusMinus icon"
                className="dark:invert h-auto"
                width='12'
                height='12'
              />
            </Button.Function>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={0}/>
          </Button.Root>

          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Number number={","}/>
          </Button.Root>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Operator>/</Button.Operator>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Operator>*</Button.Operator>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Operator>-</Button.Operator>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Operator>+</Button.Operator>
          </Button.Root>
          <Button.Root setNumber={setScreen} onScreen={screen}>
            <Button.Operator>=</Button.Operator>
          </Button.Root>
        </div>
      </div>
    </div>
  </main>
  );
}
