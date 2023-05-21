import pygame, sys
from settings import *
from level import Level
from player import Player
from settings import START_POS_X, START_POS_Y


class Game:
    def __init__(self):
        # general setup
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGTH))
        pygame.display.set_caption('Listoria')
        self.clock = pygame.time.Clock()

        self.level = Level()

        # sound
        main_sound = pygame.mixer.Sound('C:/Users/34643/PycharmProjects/Listoria/15 - fixes audio/audio/main.ogg')
        main_sound.set_volume(0.3)
        main_sound.play(loops=-1)

        # check if player is dead and game is over
        self.game_over = False

    def run(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_m:
                        self.level.toggle_menu()

            self.screen.fill(WATER_COLOR)
            self.level.run()

            # check if player is dead and game is over
            if self.level.player.is_dead():
                self.game_over = True

            # check if game is over and restart
            if self.game_over:
                self.restart()
                self.game_over = False

            pygame.display.update()
            self.clock.tick(FPS)

    def restart(self):
        self.level = Level()
        self.level.player = Player(START_POS_X, START_POS_Y)



if __name__ == '__main__':
    game = Game()
    game.run()
