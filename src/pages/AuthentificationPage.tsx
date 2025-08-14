import Page from "./layout/Page.tsx";
import AuthBox from "../components/common/AuthBox.tsx";

const AuthentificationPage = () => {
    return (
        <Page title="Authentification" description={"Page de connexion"}>
            <AuthBox/>
        </Page>
    )
}

export default AuthentificationPage