import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails } = profile;
    const email = emails[0].value;

    try {
      let user = await this.userModel.findOne({
        where: { email },
      });

      if (!user) {
        user = await this.userModel.create({
          email,
          name: `${name.givenName} ${name.familyName}`,
          googleId: profile.id,
          isEmailVerified: true,
        });
      } else if (!user.googleId) {
        user.googleId = profile.id;
        await user.save();
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}