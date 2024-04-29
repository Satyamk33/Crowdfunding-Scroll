// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding{
     struct Campaign {
            address owner;
            string title;
            string description;
            uint256 target;
            uint256 deadline;
            uint256 amountCollected;
            address[] donators;
            uint256[] donations;
     }

     struct Milestone {
        string description;
        uint256 targetAmount;
        uint256 deadline;
        bool completed;
    }

     mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Milestone[]) public campaignMilestones;

     uint256 public numberOfCampaigns = 0;

     function createCampaign( string memory _title, string memory _description, uint256 _target, uint256 _deadline ) public returns (uint256) {
              Campaign storage campaign = campaigns[numberOfCampaigns];
              require(campaign.deadline > block.timestamp, "The deadline should be a date in future");
              campaign.owner = msg.sender;
              campaign.title = _title;
              campaign.description = _description;
              campaign.target = _target;
              campaign.deadline = _deadline;
              campaign.amountCollected = 0;
              numberOfCampaigns++;
            return numberOfCampaigns - 1;

     }

     function addMilestone(uint256 _campaignId, string memory _description, uint256 _targetAmount, uint256 _deadline) public {
        require(_campaignId < numberOfCampaigns, "Campaign does not exist");
        campaignMilestones[_campaignId].push(Milestone(_description, _targetAmount, _deadline, false));
    }

     function donateToCampaign(uint256 _id) public payable {
        require(_id <= numberOfCampaigns, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        require(campaign.deadline > block.timestamp, "Campaign deadline passed");
        require(campaign.amountCollected + msg.value <= campaign.target, "Campaign target reached");
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;
     }

     

    function completeMilestone(uint256 _id, uint256 _milestoneIndex) public {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        require(_milestoneIndex < campaignMilestones[_id].length, "Milestone does not exist");
        Milestone storage milestone = campaignMilestones[_id][_milestoneIndex];
        require(!milestone.completed, "Milestone already completed");
        require(block.timestamp <= milestone.deadline, "Milestone deadline passed");
        milestone.completed = true;
    }

    function releaseFunds(uint256 _id) public {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only campaign owner can release funds");
        require(campaign.amountCollected >= campaign.target, "Target amount not reached");
        Milestone[] storage milestones = campaignMilestones[_id];
        for (uint256 i = 0; i < milestones.length; i++) {
            require(milestones[i].completed, "All milestones must be completed");
        }
        payable(campaign.owner).transfer(campaign.amountCollected);
        campaign.amountCollected = 0;
    }


       function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

       function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i =0; i < numberOfCampaigns; i++ ){
            Campaign storage item = campaigns[i];

            allCampaigns[i] =  item;
        }

        return allCampaigns;
    }

}

