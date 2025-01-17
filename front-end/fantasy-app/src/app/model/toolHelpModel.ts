export class SimpleTextCategory {
    title?: string;
    list?: string[];
    text?: string;
    link?: string;
    type?: string;
}

export const FooterTutorial: SimpleTextCategory[] = [
    {
        title: 'Have more questions?',
        list: [
            'Reach out to Jeremy via the discord, twitter (@dynastydaddyff), or email (jertimperio@gmail.com).',
        ]
    }
];

// Power rankings how to info
export const PowerRankingsTutorial: SimpleTextCategory[] = [
    {
        title: 'Overview',
        list: [
            'The \"Load Preset\" button will let you select a specifc view for the power rankings tool. For more information on each preset, check the Power Ranking Presets section.',
            'The chart displays overall value with each color being a specific position room\'s overall value. You can right-click and save an image of this chart.',
            'The table displays all teams and their power rankings. Each row can be expanded to show each position room in depth.',
            'The table can be sorted by field by pressing a field in the header. You may also search for a specific player or team name via the search bar.',
            'The expand arrow (⤢) will expand or collapse all the expandable rows.',
            'At the bottom, you can download the power rankings table to a CSV to import into any other spreadsheet application.'
        ]
    },
    {
        title: 'Power Ranking Presets',
        list: [
            'Trade Value View - This view shows each position based on fantasy market trade value. While this view typically is used for dynasty leagues, you can select a redraft fantasy market to generate power rankings with those trade values. [Default for Dynasty/Keeper leagues]',
            'Contender View - This view shows each position based on current season outlook using average ADP accross multiple platforms. All categories are ranked based on starter value. For more information on each individual metric check the Metric Legend. [Default for Redraft]',
        ]
    },
    {
        title: 'Metric Legend',
        list: [
            'Overall Value - Calculated by adding all the selected fantasy market trade values for the entire roster together. This value will sum all players and draft picks on a roster.',
            'Overall Rank - This value is based on the overall value. All teams are ranked from worst (highest) to best (lowest). This metric is useful for determining a team\'s flexibility and depth of assets.',
            'Starter Value - Calculated by selecting the best possible roster based on average ADP. To calculate this value, we use current season (redraft) positional ADPs from multiple sources (Fantasy Pros, BestBall10s, Real-Time Fantasy Sports, Underdog Fantasy, and Drafters Fantasy Sports). These ADPs are averaged and summed (with some other math) to create the starter values for each team. These values quantify the strength of a team in the upcoming season. It does factor in significant status like IR, SUS, or COV in the starter rank as well. A starter is denoted by the star next to the player\'s name in the power rankings table.',
            'Starter Rank - This value is based on the starter value. All teams are ranked from worst (highest) to best (lowest). This gives a glimse into what teams are determined to be the best and what teams are the worst. Using the contender table view (⚙ > Table View), you can update the table to filter all position groups by starter value as well.',
            'Tiers - Tiers are assigned to teams based on their starter value. Starter value is the current season strength of their team based on positional ADP. Using the starter value calculated, all teams in a league are put through a bucket sort algorithm where each team is put into 4 buckets. Each bucket is a tier.',
            '(Position Group) Value - Calculated by adding all the selected fantasy market trade values for a specific position group. This metric is useful for quickly identifying what position each team is invested heavily in. Ex. QB Value is the fantasy market value of all QBs on a roster.',
            '(Position Group) Rank - This value is based on the related position group value. All teams are ranked from worst (highest) to best (lowest).',
            '(Position Group) Contender Value - Calculated by adding the starters average ADP for a specific position group. This metric is useful for identifying which teams have the strongest starting line-up for the upcoming season.',
            '(Position Group) Contender Rank - This value is based on the related position group contender value. All teams are ranked from worst (highest) to best (lowest).',
        ]
    },
    {
        title: 'Tiers',
        list: [
            'Contender - This tier is for teams that rank the highest in the league. A contender has a strong chance of making the playoffs and a good chance to win it all.',
            'Frisky - This tier is the 2nd highest bucket and holds fringe playoff teams in the league. These teams could be considered wildcard teams or teams that barely miss the playoffs.',
            'Fraud - This tier is the middling tier and most likely won\'t make the playoffs. These teams could be exiting a rebuild or tailing off from a contender run.',
            'Rebuilding - This tier is the bottom tier and holds the teams that are in a deep rebuild. These teams usually end up with high picks and oftentimes skew young.',
            'Super Team - This tier is when the contender tier bucket only has one team. Meaning this team\'s starter value is so much higher than the rest of the league, that the bucket sort algorithm determined the rest of the league is closer to each other than that team. This team is a clear favorite to win the championship heading into the season.',
            'Trust the Process - This tier is when the rebuilding tier bucket only has one team. Meaning this team\'s starter value is so much lower than the rest of the league, that the bucket sort algorithm determined the rest of the league is closer to each other than that team. This team is missing many pieces and most likely is aiming for the first pick next year.'
        ]
    },
    {
        title: '⚙ Advanced Options (Desktop only)',
        list: [
            'Order Chart - This dropdown controls what order the chart will be sorted from left-to-right based on the selected metric. The default is overall value.',
            'Fantasy Market - This dropdown controls what fantasy market\'s values are used to create the power rankings.'
        ]
    }
]


// Power rankings how to info
export const PlayoffCalculatorTutorial: SimpleTextCategory[] = [
    {
        title: 'Overview',
        list: [
            'The playoff calculator will utilize starter value to generate weekly probablilities for each week and run 10,000 simulations for a season in your league. The Playoff Calculator will update weekly as the season progresses to give the most accurate results for how the season will play out.',
            'Starter Value - Calculated by selecting the best possible roster based on average ADP. To calculate this value, we use current season (redraft) positional ADPs from multiple sources (Fantasy Pros, BestBall10s, Real Time Fantasy Sports, Underdog Fantasy, and Drafters Fantasy Sports). These ADPs are averaged and summed (with some other math) to create the starter values for each team. These values quantify the strength of a team in the upcoming season. It does factor in significant statuses like IR, SUS, or COV in the starter rank as well. A starter is denoted by the star next to the player\'s name in the power rankings table.',
        ]
    },
    {
        title: 'Season Tab',
        list: [
            'The table shows each team and selected metrics based on the 10,000 simulations run for your league.',
            'There are two models available to use for the season simulations: Traditional ADP & Elo-Adjusted ADP.',
            'Traditional ADP Model: Uses the existing starter value generated from the power rankings page as the team rating for simulations. That rating is generated from a summation of average ADP for all starters.',
            'Elo-Adjusted ADP Model: This model builds off the existing Traditional ADP Model but adds in the previous week\'s results. Using an elo algorithm, the team values will update based on the previous teams they beat or lost to. You can track the weekly change in the Change column that shows in the table.',
            'Using the \"Forcast From\" dropdown, you can select what week of the season to run the simulations from. This can be useful to see how the season projections progress throughout the year.',
            'With the \"Metrics\" dropdown, you can manually configure which simulation metrics you want to appear on the table when running simulations.',
            'The \"Select Future Game Results\" button will open a dropdown to let you select future results to see how winning or losing a match-up will impact the playoff changes.',
            'The download button will export the simulation table to a CSV to make it easy to import into other spreadsheet tools.'
        ]
    },
    {
        title: 'Weekly Tab',
        list: [
            'This tab displays weekly match-ups with a projected chance of winning and the results of the game.',
            'The upcoming matchups will be at the top and the completed weeks will be at the bottom of the page in reverse order (so the most recent games are at the top).',
            'Note: Some platforms generate mock playoff matchups during the season and others leave them empty.'
        ]
    },
]

export const LeagueFormatTutorial: SimpleTextCategory[] = [
    {
        title: 'Overview',
        list: [
            'The League Format Tool enables you to create your own data visualizations and tables to dive deep into your league format to find positional advantages and sleepers. This tool supports K, Team Defense, & IDP as well.',
            'Using the \"Load Presets\" button, you can select from different views that emphasize a specific metric. These views will set up visualizations & configure the table to meet the selected preset.',
            'By clicking the year dropdown, you can select what year to load stats from all the way back to 2019.',
            'NOTE: This tool is still in Beta. Some stats may differ from your platform\'s scoring due to yard thresholds being different or other limitations. Feel free to reach out with your league id if you are noticing any odd behavior.'
        ]
    },
    {
        title: 'Custom Data Visualizations (Desktop Only)',
        list: [
            'By selecting the \"Add Visualization\" dropdown, you can toggle what visualizations you would list to appear. There is no limit to how many visualizations you want to appear.',
        ]
    },
    {
        title: 'Data Table Options',
        list: [
            'The data table enables searching player names via the search bar and sorting by column values by selecting the field in the table headers.',
            'Using the \"Filter Position\" dropdown, you can configure what player positions to filter out from the data table. This can be useful for diving into a specific position group(s).',
        ]
    },
    {
        title: '⚙ Advanced Table Options (Desktop only)',
        list: [
            'By selecting the ⚙ icon, you can further customize the data table.',
            'With the \"Customize Table\" dropdown, you can manually configure what columns you want to appear on the data table. You have full flexibility when creating what visuals are added.',
            'Using the \"Fantasy Market\" dropdown, you can customize what player trade value is present in the table when selecting the column.'
        ]
    },
    {
        title: 'Metrics Legend',
        list: [
            'WoRP - WoRP stands for Wins Over Replacement Player and is a useful cross-positional metric to derive what position groups make the biggest impact for your league format. In simple terms, WoRP quantifies the value a specific player has vs a replacement-level player on a week-to-week basis. A Replacement level player would be a player outside the ideal starter range for your league so in a 12-team 1QB league that would be QB 13 and beyond.',
            'WoRP Per Game - Using WoRP calculations, this is Worp divided by games played. It can be useful to catch players that have high WoRP but missed more games than others.',
            'Spike Weeks - Spike weeks are calculated based on if a player ranks among a top threshold amount of players based on your format. For high spike weeks, the player must rank in the top half of the starting roster spots for that position ({pos starts} * {team count} / 2). For mid-spike weeks, players must be an optimal or quality starter for that week ({pos starts} * {team count}). For low spike weeks, a player must finish as a top starter or flex option for a position that week ({pos starts + (flex/super_flex/idp_flex)} * {team count}. Based on some league formats results may vary.',
            'Fantasy Opportunities - Fantasy Opportunities count how many times a specific player was in the position to score points. For QB, this counts pass & rush attempts. For WR, RB, and TE, this counts pass, rush, & rec attempts. For K, this counts all extra point & field goal attempts. For Team Defense or IDP, this counts all snaps the defense or defensive player played.',
        ]
    },
    {
        title: 'WoRP Tiers',
        list: [
            'WoRP tier - This metric is an experimental metric to make WoRP easier to digest and process at a glance. Using a bucket sort algorithm, Dynasty Daddy sorts all players into 6 buckets or tiers that are listed below:',
            'League Breaker - This player is a true difference maker in that season. The teams with a League Breaker player probably made the playoffs and most likely are on a championship team. (Mobile: Tier is just Breaker)',
            'Elite - A confident weekly starter that can have league-breaking upside. Typically the backbone of a solid contending team.',
            'Starter - A solid starter player but doesn\'t have the league-breaking upside that season. Can be a great flex option on a champion-caliber team.',
            'Bench Piece - A weak starter and solid depth piece that has enough value to be rostered but not enough production to be a reliable starter. (Mobile: Tier is just Bench)',
            'Roster Clogger - A player that has some value but lacks any relevant production. Most likely this player is on waivers or burning a hole on some team\'s bench somewhere. (Mobile: Tier is just Clogger)',
            'Waiver - A droppable player that will probably be available in most leagues with this format. The definition of a waste of a roster space.'
        ]
    },
    {
        title: 'Advanced Filtering (Desktop Only)',
        list: [
            'By clicking on the filter icon, the advanced filtering modal will pop up to let you create complex queries on the data table.',
            'You can select what fields you want to filter on, the operator, and the value threshold to filter on. You can create and/or statements and nested sets of rules to create more complex queries for your data.',
            'After applying an advanced filter, another icon with the filter and a slash will be present. By clicking that icon, the advanced filter will be removed from the data table.'
        ]
    },
];

export const TradeCalculatorTutorial: SimpleTextCategory[] = [
    {
        title: 'Overview',
        list: [
            'The Trade Calculator is a cutting edge fantasy football trade analyzer that let\'s you log into your league and generate power rankings on the trade.',
            'Add players on both sides of the trade and see which side win the trade. Toggle between fantasy markets to determine what market to calculate the trade for.',
        ]
    },
    {
        title: 'Trade Calulator',
        list: [
            'Add a player to the left or right side to make the trade you want to calculate.',
            'When players are added on both sides, you can click the \"Even out trade\" button to automatically build a fair trade.',
        ]
    },
    {
        title: 'Power Rankings Card',
        list: [
            'When logged in, our calculator will generate a mock power rankings as if the created trade went through.',
            'The arrows will denote if a category has risen or fallen from the proposed trade.'
        ]
    }
];

export const DataSourcesInfo: SimpleTextCategory[] = [
    {
        text: 'Dynasty Daddy is powered by the community for the community for free. In an effort to give exposure to the innovated creators in the fantasy space, I\'ve compiled a list of sites and links to support these sites that help make Dynasty Daddy a great fantasy football resource.',
        type: 'text'
    },
    {
        title: 'KeepTradeCut',
        link: 'https://keeptradecut.com',
        list: [
            'KeepTradeCut is a free dynasty fantasy football resource that crowdsources up-to-date dynasty rankings and values.',
            'By asking users to Keep, Trade, or Cut 3 players, KTC is able to generate player trade values and rankings from all these datapoints.',
            'Dynasty Daddy uses the trade values and updated every day at 5:00 AM.'
        ],
        type: 'list'
    },
    {
        title: 'FantasyCalc',
        link: 'https://fantasycalc.com',
        list: [
            'FantasyCalc scrapes Sleeper & MFL league trades to create player trade values and rankings based on their algorithm.',
            'Dynasty Daddy uses the trade values and updated every day at 5:00 AM.'
        ],
        type: 'list'
    },
    {
        title: 'DynastyProcess',
        link: 'https://dynastyprocess.com',
        list: [
            'DynastyProcess uses FantasyPros\'s Expert Consensus Rankings to create dynasty rankings and trade values',
            'Dynasty Daddy uses the trade values and updated every day at 5:00 AM.'
        ],
        type: 'list'
    },
    {
        title: 'DynastySuperflex',
        link: 'https://www.dynastysuperflex.com/',
        list: [
            'DynastySuperflex combines all three trade values from KeepTradeCut, FantasyCalc, and DynastyProcess to create it\'s own fantasy rankings and trade values.',
            'Dynasty Daddy uses the trade values and updated every day at 5:00 AM.'
        ],
        type: 'list'
    },
    {
        title: 'FantasyPros',
        link: 'https://fantasypros.com',
        list: [
            'FantasyPros is a fantasy football tool and stores many pages of data. For Dynasty Daddy, we reference their document of Best-Ball ADPs which has references to many ADPs across the fantasy space.',
            'Dynasty Daddy uses the player ADP data and updated every day at 5:00 AM.'
        ],
        type: 'list'
    },
    {
        title: 'PlayerProfiler',
        link: 'https://www.playerprofiler.com/',
        list: [
            'PlayerProfiler is home of the best NFL player profiles, advanced fantasy football statistics, and fresh fantasy football content on the interwebs.',
            'Dynasty Daddy uses player combine results data.'
        ],
        type: 'list'
    },
    {
        title: 'OverTheCap',
        link: 'https://overthecap.com/',
        list: [
            'OverTheCap has NFL salary cap and contract information for every player including bonus money, dead money, and positional salary rankings.',
            'Dynasty Daddy uses the current player contact information.'
        ],
        type: 'list'
    },
    {
        title: 'Ras.football',
        link: 'https://ras.football/',
        list: [
            'Ras.football is the site that hosts the ras score calculator and blog.',
            'Dynasty Daddy uses player RAS scores from the site.'
        ],
        type: 'list'
    },
    {
        title: 'NFLVerse',
        link: 'https://nflverse.nflverse.com/',
        list: [
            'The nflverse is a set of packages dedicated to data of the National Football League. The nflverse package is designed to make it easy to install and load core packages from the nflverse in a single command.',
            'Dynasty Daddy uses the the play-by-play data for creating stat thresholds for the immaculate gridiron.'
        ],
        type: 'list'
    },
    {
        text: 'Dynasty Daddy does not take credit for any of these sites or their data.',
        type: 'text'
    },
];


export const TradeDatabaseTutorial: SimpleTextCategory[] = [
    {
        title: 'Overview',
        list: [
            'The Trade Database is a powerful tool giving you access to a treasure trove of completed trades and statistics at your fingertips, helping you make strategic trade decisions and dominate your fantasy league.',
            'We pull over 300,000 trades across 50,000+ league daily to give you up to date trades from across the fantasy space.',
            'Trades are pulled every evening at 12 AM.'
        ]
    },
    {
        title: 'Trade Volume Chart',
        list: [
            'The Trade Volume Chart is a circle pack chart showing the top 50 (30 for mobile) most traded players in the past week and updated every 6 hours.',
            'You can hover over a circle to pull up information in a tooltip or drag around the circles (that\'s mainly just for fun 😆).',
            'By clicking the circle, a trade database search for that player will be triggered returning results for that player.'
        ]
    },
    {
        title: 'Trade Database Search',
        list: [
            'Add players to either side of a trade and see what trades have been made with specific players.',
            'Using the league setting dropdowns, filter trades based on specific league format. More information below on each dropdown.',
            'Click the \'🔎 Search\' button to load new trades based on the filters set.',
            'If you are logged in, you can click the \'Use My League Settings\' button to filter to only leagues matching your format.'
        ]
    },
    {
        title: 'League Setting Filter Details',
        list: [
            'League Type - Select between Dynasty or Redraft leagues to pull trades for.',
            'Quarterbacks - Include trades with 1 starting QB or 2 starting QBs in their league.',
            'Scoring Format - Include trades with 0, 0.5, or 1.0 PPR formats.',
            'Tight End Premium - Include trades with specific Tight End Premium formats.',
            'Team Count - Filter trades based on how many teams are in the league.',
            'Starter Count - Include trades based on how many offensive starters are in the league.'
        ]
    }
];