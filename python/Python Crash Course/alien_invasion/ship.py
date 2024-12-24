import pygame

class Ship:
    """Manage the ship."""
    
    def __init__(self, ai_game):
        """Initialize the ship and set its starting position."""
        
        self.screen = ai_game.screen
        self.screen_rect = ai_game.screen.get_rect()