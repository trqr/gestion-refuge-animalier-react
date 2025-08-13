import type {ReactNode} from "react";

type PagesProps = {
    children: ReactNode;
    title: string;
    description: string;
}


const Page = ({children, title, description}: PagesProps) => {
    return (
        <>
            <title>{title}</title>
            <meta name={description} content="Movie App"/>
            <link rel="icon" href={"/refuge-animalier-icon.png"}/>

            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={"/refuge-animalier-icon.png"}/>
            <meta property="og:type" content="movie"/>
            {children}
        </>
    )
}

export default Page;