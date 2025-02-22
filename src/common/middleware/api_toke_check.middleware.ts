import { BadRequestException, NestMiddleware } from "@nestjs/common";

export class ApiTokenCheckMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: Function) {
        if(!(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer '))){
            throw new BadRequestException('Authentication failed: Bearer token missing')
        }
        next()
    }
}