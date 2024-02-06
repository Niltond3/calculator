import {Button} from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen bg-white text-slate-800 antialiased dark:bg-slate-900 dark:text-slate-100 flex justify-center items-center">
    <div className="flex h-fit flex-col border border-white p-2 rounded-3xl ">
      <div className="border-white/20 border p-2 m-2 rounded-2xl flex flex-col">
          <div>
          <span>
          <Image
              src="/history.svg"
              alt="history icon"
              className="dark:invert opacity-20 hover:opacity-60 transition h-auto"
              width={16}
              height={24}
              priority
            />
          </span>
          </div>
          <div className="flex justify-end">
          <span>
              screen
          </span>
          </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-52">
        <div>
          <Button.Root>
            <Button.Function>CE</Button.Function>
          </Button.Root>
          <Button.Root>
            <Button.Function>C</Button.Function>
          </Button.Root>
          <Button.Root>
            <Button.Function>
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
          <Button.Root>
            <Button.Function>(</Button.Function>
          </Button.Root>
          <Button.Root>
            <Button.Function>)</Button.Function>
          </Button.Root>
          <Button.Root>
            <Button.Function>%</Button.Function>
          </Button.Root>
          </div>
          <div className="flex flex-row flex-wrap">
          <Button.Root>
            <Button.Number number={7}/>
          </Button.Root>
          <Button.Root>
            <Button.Number number={8}/>
          </Button.Root>
          <Button.Root>
            <Button.Number number={9}/>
          </Button.Root>
          <Button.Root>
            <Button.Number number={4}/>
          </Button.Root>
          <Button.Root>
            <Button.Number number={5}/>
          </Button.Root>
          <Button.Root>
            <Button.Number number={6}/>
          </Button.Root>
          <Button.Root>
            <Button.Number number={1}/>
          </Button.Root>
          <Button.Root>
            <Button.Number number={2}/>
          </Button.Root>
          <Button.Root>
            <Button.Number number={3}/>
          </Button.Root>
          <Button.Root>
            <Button.Function>
              <Image
                src="/plusMinus.svg"
                alt="plusMinus icon"
                className="dark:invert h-auto"
                width='12'
                height='12'
              />
            </Button.Function>
          </Button.Root>
          <Button.Root>
            <Button.Number number={0}/>
          </Button.Root>

          <Button.Root>
            <Button.Number number={","}/>
          </Button.Root>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Button.Root>
            <Button.Operator>/</Button.Operator>
          </Button.Root>
          <Button.Root>
            <Button.Operator>x</Button.Operator>
          </Button.Root>
          <Button.Root>
            <Button.Operator>-</Button.Operator>
          </Button.Root>
          <Button.Root>
            <Button.Operator>+</Button.Operator>
          </Button.Root>
          <Button.Root>
            <Button.Operator>=</Button.Operator>
          </Button.Root>
         
        </div>
      </div>
    </div>
  </main>
  );
}
