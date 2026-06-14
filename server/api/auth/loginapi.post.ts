export default defineEventHandler(async (event) => {
        const config = useRuntimeConfig()

        const body = await readBody(event);
        try{

            const response = await $fetch(`${config.backendApi}/rest/api/auth/login`,{
                method: 'POST',
                body : body
            })

            return response;

        }catch(error : any){
             throw createError({
            statusCode: 400,
            message: 'Terjadi kesalahan.'
        });
        }
 
});