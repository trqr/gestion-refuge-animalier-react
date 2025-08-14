import React, {useState, useTransition} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Alert,
    Box,
    LinearProgress,
    Link
} from "@mui/material";
import {Visibility, VisibilityOff, LockOutlined} from "@mui/icons-material";
import {login} from "../../api/services/Auth.service.ts";
import {useNavigate} from "react-router-dom";

export type LoginDTO = {
    email: string;
    password: string;
}

export interface AuthBoxProps {
    title?: string;
    forgotPasswordHref?: string;
}

export default function AuthBox({
                                    title = "Connectez vous",
                                    forgotPasswordHref = "#",

                                }: AuthBoxProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition()
    const [values, setValues] = useState<LoginDTO>({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!values.email) {
            newErrors.email = "L'email est requis";
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
            newErrors.email = "Email invalide";
        }
        if (!values.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (values.password.length < 8) {
            newErrors.password = "Le mot de passe doit avoir au moins 8 caracteres";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof LoginDTO) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValues({...values, [field]: e.target.value});
    };

    const submit = async () => {
        if (!validate()) return;
        startTransition( async () => {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const authData = await login(values);
            if (authData.user){
                navigate("/");
            } else {
                setServerError(authData.response.data);
            }
            console.log(authData);
        })
    };

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                bgcolor: (t) => (t.palette.mode === "light" ? "#f7f7f9" : "background.default"),
                p: 2
            }}
        >
            <Card sx={{width: "100%", maxWidth: 420, borderRadius: 4, boxShadow: 6}}>
                {isPending && <LinearProgress/>}
                <CardHeader
                    avatar={<LockOutlined color="primary"/>}
                    title={<Typography variant="h5">{title}</Typography>}
                    subheader={<Typography variant="body2">Bonjour, saisissez vos identifiants</Typography>}
                />
                <CardContent sx={{pt: 0, display: "grid", gap: 2}}>
                    {serverError && (
                        <Alert severity="error" onClose={() => setServerError(null)}>
                            {serverError}
                        </Alert>
                    )}

                    <TextField
                        label="Email"
                        type="email"
                        autoComplete="email"
                        fullWidth
                        disabled={isPending}
                        value={values.email}
                        onChange={handleChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        fullWidth
                        disabled={isPending}
                        value={values.password}
                        onChange={handleChange("password")}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword((s) => !s)}
                                        edge="end"
                                        disabled={isPending}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Link href={forgotPasswordHref} underline="hover">
                            Mot de passe perdu?
                        </Link>
                    </Box>
                </CardContent>
                <CardActions sx={{p: 2, pt: 0}}>
                    <Button
                        type="button"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={submit}
                        disabled={isPending}
                    >
                        {isPending ? "Connexion en cours..." : "Se connecter"}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
