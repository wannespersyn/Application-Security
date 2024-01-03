import { useRouter } from "next/router";

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: {target: { value: string } }) => {
        const newLocale = event.target.value;
        const { pathname, asPath, query } = router; 
        router.push({
            pathname,
            query,
        }, asPath, { locale: newLocale });
    };

    return (
        <div className="ml-6">
            <label htmlFor="language" className="text-white mx-1">
                Language:
            </label>
            <select
                id="language"
                className="p-1 rounded-md border border-gray-300 bg-white text-gray-900 outline-none"
                value={locale}
                onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="es">Espãnol</option>
                <option value="nl">Nederlands</option>
            </select>
        </div>
    );
};

export default Language;